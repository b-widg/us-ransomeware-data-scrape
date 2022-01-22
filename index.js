const { JSDOM } = require('jsdom');

const wait = async (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const getData = async () => {
  let attackDetails = [];
  const baseUrl =
    'https://www.pcmatic.com/ransomware/ransomwarestate.asp?state=';
  const states = [
    'AK',
    'AL',
    'AR',
    'AZ',
    'CA',
    'CO',
    'CT',
    'DC',
    'DE',
    'FL',
    'GA',
    'HI',
    'IA',
    'ID',
    'IL',
    'IN',
    'KS',
    'KY',
    'LA',
    'MA',
    'MD',
    'ME',
    'MI',
    'MN',
    'MO',
    'MS',
    'MT',
    'NC',
    'ND',
    'NE',
    'NH',
    'NJ',
    'NM',
    'NV',
    'NY',
    'OH',
    'OK',
    'OR',
    'PA',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VA',
    'VT',
    'WA',
    'WI',
    'WV',
    'WY',
  ];

  for await (const state of states) {
    await JSDOM.fromURL(`${baseUrl}${state}`).then((dom) => {
      const doc = dom.window.document;

      const tableRows = doc.querySelectorAll('table#reportTbl tbody tr');

      tableRows.forEach((row) => {
        const tableData = row.querySelectorAll('td');
        attackDate = tableData[0].textContent;
        entity = tableData[1].textContent;
        city = tableData[2].textContent.split(',')[0]; // Pull city only from City, ST
        entitType = tableData[3].textContent;
        ransomePaid = tableData[4].textContent;
        amountPaid = parseInt(tableData[5].textContent.slice(1)) || ''; // Remove $ from string and convert to Int
        foiaReq = tableData[6].textContent;
        avBefore = tableData[7].textContent.split(', '); // Convert to array
        avAfter = tableData[8].textContent.split(', '); // Convert to array

        const attackDetail = {
          attackDate,
          entity,
          city,
          state,
          entitType,
          ransomePaid,
          amountPaid,
          foiaReq,
          avBefore,
          avAfter,
        };
        attackDetails = [...attackDetails, attackDetail];
      });
    });
    await wait(1500);
  }
  return attackDetails;
};
