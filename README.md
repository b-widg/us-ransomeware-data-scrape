# Simple Scrape of US Ransomware Attack Data

## About
This is a script written to gather some sample data to use in a visualization.  I decided to share in case anyone was interested.  The data lists details of  ransomware attacks in the US in recent years and is taken from the [PC Matic](https://www.pcmatic.com/ransomware/) website.

## Dependencies
- [jsdom](https://www.npmjs.com/package/jsdom)
- [objects-to-csv-file](https://www.npmjs.com/package/objects-to-csv-file)

## Usage
If you'd like to try it out, it's ready to go.  Just clone or download the files.  Navigate into the directory where you saved it. 

Update your dependencies:
```
$ npm install
```
Run the script:
```
$ npm start
```
The files are saved as both JSON and CSV in the folder named scrape_results.  The files currently in the folder will be overwitten with your new data when you run the script.  

The process will probably take a little under two minutes as a 1.5 second delay is included for each of the 50 URLs that are visited.

## [Data Visualization From Scrape on Tableau Public](https://public.tableau.com/app/profile/brian.widgeon/viz/US_Ransomware_Attacks/USRansomwareDashboard)
![Tableau Data Visulization From Scraped Data](./DataViz.png "US Ransomware Attacks Q1 2016 - Q3 2021
")