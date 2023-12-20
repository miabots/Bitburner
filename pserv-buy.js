/** @param {NS} ns */
export async function main(ns) 
{
  var ram = 2;
  const hackscript = "hack.js";

  const pservs = ["pserv-0","pserv-1","pserv-2","pserv-3","pserv-4","pserv-5","pserv-6",
                      "pserv-7","pserv-8","pserv-9","pserv-10","pserv-11","pserv-12",
                      "pserv-13","pserv-14","pserv-15","pserv-16","pserv-17","pserv-18",
                      "pserv-19","pserv-20","pserv-21","pserv-22","pserv-23", "pserv-24"]

  //delete existing servers
  for (let i = 0; i < pservs.length; ++i) 
  {
    const serv = pservs[i];
    if (ns.serverExists(serv))
    {
      ns.scriptKill("hack.js",serv)
      ns.deleteServer(serv)
    }
  }  

  //check current money and parse
  var cash = ns.getServerMoneyAvailable("home")
  cash = Math.floor(cash)
  cash = parseInt(cash)

  var cost = 0

  // loop through the cost function for pservs for each ram until the returned cost = the limit
  while (1==1)
  {
    cost = ns.getPurchasedServerCost(ram)
    ns.alert("cost: " + cost + " cash: " + cash/25 + " ram: " + ram)
    if (cost > cash/25)
    {
      ram = ram/2
      break
    }
    ram=ram*2
  }
  
  let i = 0
  // Continuously try to purchase servers until we reach the maximum
  while (i < ns.getPurchasedServerLimit()) {
      let hostname = ns.purchaseServer("pserv-" + i, ram);
      ns.scp(hackscript, hostname);

      var threads = ctc(ns, hackscript, hostname)

      ns.exec(hackscript, hostname, threads);
      ++i;

      //Removing this line will cause an infinite loop and crash the game.
      await ns.sleep(1000);
  }
}

//takes script and server and gets the thread count
//ctc = calculate thread count
export function ctc(ns, script, target) 
{
  const scriptram = ns.getScriptRam(script)
  const targetram = ns.getServerMaxRam(target)
  var threads = targetram/scriptram
  var ts = ~~threads

  if (ts == 0){return 1}
  else{return parseInt(ts)}
}