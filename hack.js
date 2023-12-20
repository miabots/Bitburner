/** @param {NS} ns */
export async function main(ns) {

    const t2= "joesguns";
    const t3 = "phantasy";

    const pservs = ["pserv-0","pserv-1","pserv-2","pserv-3","pserv-4","pserv-5","pserv-6",
                        "pserv-7","pserv-8","pserv-9","pserv-10","pserv-11","pserv-12",
                        "pserv-13","pserv-14","pserv-15","pserv-16","pserv-17","pserv-18",
                        "pserv-19","pserv-20","pserv-21","pserv-22","pserv-23", "pserv-24", 
                    ]

    var target = ns.getHostname()

    if (pservs.includes(target)){target = t3}

    const moneyThresh = ns.getServerMaxMoney(target);

    const securityThresh = ns.getServerMinSecurityLevel(target);

    // Infinite loop that continously hacks/grows/weakens the target server
    while(true) {
        if (ns.getServerSecurityLevel(target) > securityThresh) {
            // If the server's security level is above our threshold, weaken it
            await ns.weaken(target);
        } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
            // If the server's money is less than our threshold, grow it
            await ns.grow(target);
        } else {
            // Otherwise, hack it
            await ns.hack(target);
        }
    }
}