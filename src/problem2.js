/* eslint-disable array-callback-return */
const fs = require('fs');

const rawJobsData = fs.readFileSync('../data/jobs.json');
const rawTechnologiesData = fs.readFileSync('../data/technologies.json');
const jobs = JSON.parse(rawJobsData);
const technologies = JSON.parse(rawTechnologiesData);
const newArray = [];

jobs.map((job) => {
  technologies.map((technology) => {
    const newObj = {
      company: job.company,
      description: job.description,
      tags: technology,
      processing_timestamp: Math.floor(Date.now()),
    };
    newArray.push(newObj);
  });
});

// eslint-disable-next-line quotes
fs.writeFileSync(`${Math.floor(Date.now() / 1000)}_response.json`, JSON.stringify(newArray, null, 2));
