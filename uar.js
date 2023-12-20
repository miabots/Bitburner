/** @param {NS} ns */
export async function main(ns) {

  // Array of all servers that have been found and verified as hackable
  let slist = [
    "sigma-cosmetics", "joesguns", "nectar-net", "hong-fang-tea", "harakiri-sushi", "foodnstuff",
    "pserv-0", "pserv-1", "pserv-2", "pserv-3", "pserv-4", "pserv-5", "pserv-6",
    "pserv-7", "pserv-8", "pserv-9", "pserv-10", "pserv-11", "pserv-12",
    "pserv-13", "pserv-14", "pserv-15", "pserv-16", "pserv-17", "pserv-18",
    "pserv-19", "pserv-20", "pserv-21", "pserv-22", "pserv-23", "pserv-24",
    "neo-net", "zer0", "max-hardware", "iron-gym", "phantasy",
    "silver-helix", "avmnite-02h", "omega-net", "catalyst",
    "I.I.I.I", "the-hub", "computek", "netlink", "rothman-uni", "rho-construction",
    "johnson-ortho", "crush-fitness", "aevum-police", "alpha-ent", "millenium-fitness",
    "summit-uni",
  ];

  let slist2 = ["the-hub"]

  const hackscript = "hack.js"

  // Copy and run the hack script onto each server to gain root access
  for (let i = 0; i < slist.length; ++i) {
    const serv = slist[i];
    var check = 0;

    //Check if the server exists
    if (!(ns.serverExists(serv))) {
      ns.print(serv + " does not exist, skipping.")
      continue;
    }

    //Get the threads needed to run the hack script provided on the server provided
    var threads = ctc(ns, hackscript, serv)

    //Copy the hack script to the server
    ns.scp(hackscript, serv);

    //Get the # of ports needed to open
    var ports = ns.getServerNumPortsRequired(serv)

    //Run port openers in order based on need
    if (ns.fileExists("BruteSSH.exe", "home")) { 
      if (ports == 1 || ports == 2 || ports == 3 || ports == 4 || ports == 5) { ns.brutessh(serv);}}
    if (ns.fileExists("FTPCrack.exe", "home")) { 
      if (ports == 2 || ports == 3 || ports == 4 || ports == 5) { ns.ftpcrack(serv);}}
    if (ns.fileExists("relaySMTP.exe", "home")) { 
      if (ports == 3 || ports == 4 || ports == 5) { ns.relaysmtp(serv);}}
    if (ns.fileExists("HTTPWorm.exe", "home")) { 
      if (ports == 4 || ports == 5) { ns.httpworm(serv);}}
    if (ns.fileExists("SQLInject.exe", "home")) { 
      if (ports == 5) { ns.sqlinject(serv);}}

    //run algoritm to determine if the machine is ready to be hacked

    if (ports == 5 && ns.fileExists("SQLInject.exe", "home")) { check = 1; }
    if (ports == 4 && ns.fileExists("HTTPWorm.exe", "home")) { check = 1; }
    if (ports == 3 && ns.fileExists("relaySMTP.exe", "home")) { check = 1; }
    if (ports == 2 && ns.fileExists("FTPCrack.exe", "home")) { check = 1; }
    if (ports == 1 && ns.fileExists("BruteSSH.exe", "home")) { check = 1; }
    if (ports == 0) { check = 1; }

    if (check == 1) {
      //get root
      ns.nuke(serv);

      //run the hack script on the target server with the calced # of threads
      ns.exec(hackscript, serv, threads);
    }
      ns.formulas.mockPerson.apply
  }

}

//takes script and server and gets the thread count
//ctc = calculate thread count
export function ctc(ns, script, target) {
  const scriptram = ns.getScriptRam(script)
  const targetram = ns.getServerMaxRam(target)
  var threads = targetram / scriptram
  var ts = ~~threads

  //In the event this returns 0, return 1 as the min
  if (ts == 0) { return 1 }
  else { return parseInt(ts) }
}