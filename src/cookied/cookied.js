const uuid = require('node-uuid');
const glob = {};

// manageSession and parseCookies
function parseCookies(req,res,next){
    const cookies = req.get("Cookie");
    if (req.hwCookies === undefined) {
        req.hwCookies = {};
    }
    if(cookies !== undefined){
        const cook = cookies.split("; ");
        cook.forEach(function(element) {
            const nameval = element.split("=");
            req.hwCookies[nameval[0]] = nameval[1];
        }, this);
    }
    next();
}

function manageSession(req,res,next){
    if (req.hwSession === undefined) {
        req.hwSession = {};
    }
    let id = req.hwCookies["sessionId"];
    if(id !== undefined){
        if(glob[id] !== undefined){
            req.hwSession = glob[id]; // ** change glob storage
            console.log("session already exists: [" + id + "]");
        }else{
            id = uuid.v4() + "";
            glob[id] = {};
            req.hwSession = glob[id];
            res.append("Set-Cookie", "sessionId=" + id + ";HttpOnly");
            req.hwSession["sessionId"] = id;
            console.log("session generated: [" + id + "]");
        }
    }else{
        id = uuid.v4() + "";
        glob[id] = {};
        req.hwSession = glob[id];
        req.hwSession["sessionId"] = id;
        res.append("Set-Cookie", "sessionId=" + id + ";HttpOnly");
        console.log("session generated: [" + id + "]");
    }
    next();
}

module.exports = {
    parseCookies: parseCookies,
    manageSession: manageSession
};