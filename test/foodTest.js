// Import assertion builder from chai.
const should = require("chai").should();
const expect = require("chai").expect;

// Runs the api so we can make HTTP requests
const supertest = require("supertest");
const api = supertest(require("../index.js"));

