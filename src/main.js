//////////////////////////
// Imports of main.js //
/////////////////////////

const log = require("./ultis/log")
const twingate = require("./ultis/twingate")

require("dotenv").config()
const config = require("../config.json")

////////////
// Launch //
////////////

console.clear();
console.log(`
    ██╗      ██████╗ ██╗   ██╗    ███╗   ███╗██████╗ ██████╗
    ╚██╗     ██╔══██╗╚██╗ ██╔╝    ████╗ ████║╚════██╗╚════██╗
     ╚██╗    ██████╔╝ ╚████╔╝     ██╔████╔██║ █████╔╝ █████╔╝
     ██╔╝    ██╔══██╗  ╚██╔╝      ██║╚██╔╝██║██╔═══╝  ╚═══██╗
    ██╔╝     ██████╔╝   ██║       ██║ ╚═╝ ██║███████╗██████╔╝
    ╚═╝      ╚═════╝    ╚═╝       ╚═╝     ╚═╝╚══════╝╚═════╝                                                
`);

(async () => {
  try {
    const data = await twingate.getConnectors(2)
    console.log(JSON.stringify(data, null, 2))
  } catch (error) {
    log(`There was an error! \n \n ${error}`)
  }
})();
