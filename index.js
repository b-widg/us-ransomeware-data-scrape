const fs = require('fs');
const { JSDOM } = require('jsdom');
const ObjectsToCsv = require('objects-to-csv-file');

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
        const attackYear = parseInt(tableData[0].textContent.split('-')[0]); // Original date format was 'YYYY-MM'
        const attackMonth = parseInt(tableData[0].textContent.split('-')[1]);
        const entity = tableData[1].textContent;
        const city = tableData[2].textContent.split(',')[0]; // Pull city only from City, ST
        const entitType = tableData[3].textContent;
        const ransomePaid = tableData[4].textContent;
        const amountPaid = parseInt(tableData[5].textContent.slice(1)) || ''; // Remove $ from string and convert to Int
        const foiaReq = tableData[6].textContent;
        const avBefore = tableData[7].textContent;
        const avAfter = tableData[8].textContent;
        const articleLink = tableData[1]
          .querySelector('a')
          .getAttribute('href');

        const attackDetail = {
          attackYear,
          attackMonth,
          entity,
          city,
          state,
          entitType,
          ransomePaid,
          amountPaid,
          foiaReq,
          avBefore,
          avAfter,
          articleLink,
        };
        attackDetails = [...attackDetails, attackDetail];
      });
    });
    await wait(1500);
  }
  return attackDetails;
};

(async () => {
  const attackDetails = await getData();

  // Save as JSON to file
  fs.writeFile(
    './scrape_results/attack-details.json',
    JSON.stringify(attackDetails),
    (error) => {
      if (error) console.log('ERROR - Write JSON file: ', error);
    }
  );

  // Save as CSV
  const csv = new ObjectsToCsv(attackDetails);
  await csv.toDisk('./scrape_results/attack-details.csv');
})();
