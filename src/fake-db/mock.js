// const MockAdapter = require("axios-mock-adapter");
// const axios = require("axios");
// const Mock = new MockAdapter(axios);
// export default Mock;
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
const Mock = new MockAdapter(axios);
export default Mock;
