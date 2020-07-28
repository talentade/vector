var dbip = {
    baseUrl: "//" + (document.currentScript.getAttribute("data-api-host") || "api.db-ip.com"),
    apiKey: document.currentScript.getAttribute("data-api-key") || "free",
    userTimeout: document.currentScript.getAttribute("data-user-timeout") || 5000,
    autoConvertCurrencies: document.currentScript.hasAttribute("data-convert-currencies"),
    currencyDisplay: document.currentScript.getAttribute("data-currency-display") || "symbol",
    baseCurrency: document.currentScript.getAttribute("data-base-currency"),
    autoSelectCountries: document.currentScript.hasAttribute("data-auto-select-country"),
    euMemberCallback: document.currentScript.getAttribute("data-on-eu-member") || false,
    locationCheck: false,
    apiRequests: [],
    setApiKey: apiKey=>{
        dbip.apiKey = apiKey;
        return dbip;
    }
    ,
    getVisitor: (params)=>{
        if (typeof params === "undefined") {
            params = {
                tryNavigatorGeolocation: true
            };
        } else if (typeof params.tryNavigatorGeolocation === "undefined") {
            params.tryNavigatorGeolocation = true;
        }
        return dbip.getVisitorInfo(params);
    }
    ,
    getVisitorInfo: (params)=>{
        let tryNavigatorGeolocation = false
          , navigatorGeolocationOptions = {
            enableHighAccuracy: true
        };
        if (params) {
            if (typeof params.tryNavigatorGeolocation !== "undefined") {
                tryNavigatorGeolocation = params.tryNavigatorGeolocation;
            }
            if (typeof params.navigatorGeolocationOptions !== "undefined") {
                navigatorGeolocationOptions = params.navigatorGeolocationOptions;
            }
        }
        if (tryNavigatorGeolocation) {
            let navigatorGeolocationTimeout = params.navigatorGeolocationTimeout || dbip.userTimeout;
            return new Promise((resolve,reject)=>{
                let navPromise = dbip.getVerifiedPositionFromNavigator(navigatorGeolocationOptions);
                Promise.race([navPromise, new Promise((resolve,reject)=>setTimeout(resolve, navigatorGeolocationTimeout, false))]).then(res=>{
                    if (res !== false) {
                        return resolve(res);
                    }
                    Promise.all([navPromise, dbip.apiRequest()].map(p=>p.then(res=>Promise.reject(res), err=>Promise.resolve(err), ))).then(err=>reject(err), res=>resolve(res));
                }
                , ()=>{
                    dbip.apiRequest().then(res=>resolve(res), err=>reject(err));
                }
                );
            }
            );
        } else {
            return dbip.apiRequest();
        }
    }
    ,
    getVisitorInfoFromIpLookup: ()=>dbip.apiRequest(),
    getCurrentPosition: (resolveCallback,rejectCallback,positionOptions)=>{
        let navPromise = dbip.getCurrentPositionFromNavigator(positionOptions)
          , userTimeout = (positionOptions && (typeof positionOptions.userTimeout !== "undefined")) ? positionOptions.userTimeout : dbip.userTimeout;
        Promise.race([navPromise, new Promise((resolve,reject)=>setTimeout(resolve, userTimeout, false))]).then(res=>{
            if (res !== false) {
                return resolveCallback(res);
            }
            Promise.all([navPromise, dbip.getCurrentPositionFromIpLookup()].map(p=>p.then(res=>Promise.reject(res), err=>Promise.resolve(err), ))).then(err=>rejectCallback(err), res=>resolveCallback(res));
        }
        , ()=>{
            dbip.getCurrentPositionFromIpLookup().then(res=>resolveCallback(res), err=>rejectCallback(err));
        }
        );
        return dbip;
    }
    ,
    convertCurrencies: (domSelector,rootNode)=>new Promise((resolve,reject)=>{
        if (typeof rootNode === "undefined") {
            rootNode = document.body;
        }
        if (typeof domSelector === "undefined") {
            domSelector = ".dbip-convert-currency";
        }
        let nodes = rootNode.querySelectorAll(domSelector)
          , convertList = []
          , convertNodes = []
          , promises = []
          , toLocaleStringSupportsOptions = !!(typeof Intl === "object" && Intl && typeof Intl.NumberFormat === "function");
        for (let node of nodes) {
            convertList.push([node.getAttribute("data-amount"), node.getAttribute("data-currency") || dbip.baseCurrency, ]);
            convertNodes.push(node);
        }
        if (!convertList.length) {
            return resolve();
        }
        dbip.apiRequest("convertCurrencies", convertList).then(res=>{
            for (let i in res.convertedAmounts) {
                let node = convertNodes[i]
                  , amount = res.convertedAmounts[i][0]
                  , currencyCode = res.convertedAmounts[i][1]
                  , format = node.getAttribute("data-format")
                  , currencyDisplay = node.getAttribute("data-currency-display") || dbip.currencyDisplay
                  , formattedAmount = toLocaleStringSupportsOptions ? amount.toLocaleString(undefined, {
                    style: "currency",
                    currency: currencyCode,
                    currencyDisplay: currencyDisplay,
                }) : (amount.toLocaleString() + " " + currencyCode);
                if (typeof format === "string") {
                    node.innerHTML = format.replace("{amount}", formattedAmount);
                } else {
                    node.innerHTML = formattedAmount;
                }
                if (currencyCode !== convertList[i][1].toUpperCase()) {
                    node.classList.add("converted");
                }
            }
            return resolve();
        }
        );
    }
    ),
    autoSelectCountry: (domSelector,rootNode)=>new Promise((resolve,reject)=>{
        if (typeof rootNode === "undefined") {
            rootNode = document.body;
        }
        if (typeof domSelector === "undefined") {
            domSelector = "select.dbip-auto-select-country";
        }
        let nodes = rootNode.querySelectorAll(domSelector);
        if (!nodes.length) {
            return resolve();
        }
        dbip.apiRequest().then(res=>{
            for (let select of nodes) {
                for (let option of select.getElementsByTagName("option")) {
                    if (option.hasAttribute("value") && (option.getAttribute("value") == res.countryCode)) {
                        option.setAttribute("selected", "selected");
                    } else {
                        option.removeAttribute("selected");
                    }
                }
            }
            return resolve();
        }
        );
    }
    ),
    getVerifiedPositionFromNavigator: positionOptions=>dbip.getUnverifiedPositionFromNavigator(positionOptions).then(dbip.verifyNavigatorPosition),
    verifyNavigatorPosition: position=>dbip.apiRequest("position", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy
    }),
    getUnverifiedPositionFromNavigator: positionOptions=>new Promise((resolve,reject)=>{
        if (!("geolocation"in navigator)) {
            return reject();
        }
        navigator.geolocation.getCurrentPosition(position=>{
            position.source = "browser";
            resolve(position);
        }
        , positionError=>reject(positionError), positionOptions);
    }
    ),
    getCurrentPositionFromNavigator: positionOptions=>new Promise((resolve,reject)=>{
        if (!("geolocation"in navigator)) {
            return reject();
        }
        navigator.geolocation.getCurrentPosition(position=>{
            dbip.apiRequest("verifyLocation", {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy
            }).then(function(res) {
                dbip.locationCheck = res;
            });
            position.source = "browser";
            resolve(position);
        }
        , positionError=>reject(positionError), positionOptions);
    }
    ),
    getCurrentPositionFromIpLookup: ()=>new Promise((resolve,reject)=>{
        dbip.apiRequest().then(res=>{
            if (typeof res.latitude === "undefined") {
                return reject("Free service does not return coordinates, see our paid API plans at https://db-ip.com/api/");
            }
            return resolve({
                coords: {
                    latitude: res.latitude,
                    longitude: res.longitude,
                    accuracy: 1000,
                },
                timestamp: (new Date()).getTime(),
                source: "ipaddr",
            });
        }
        );
    }
    ),
    apiRequest: (params,data)=>{
        for (let req of dbip.apiRequests) {
            if (((typeof params === "undefined") && (typeof data === "undefined")) || ((req.params == params) && (req.data == data))) {
                return req.apiRequest;
            }
        }
        let req = dbip.realApiRequest(params, data);
        dbip.apiRequests.push({
            params: params,
            data: data,
            apiRequest: req,
        });
        return req;
    }
    ,
    realApiRequest: (params,data)=>new Promise((resolve,reject)=>{
        let xhr = new XMLHttpRequest()
          , queryParam = ""
          , method = "GET";
        if (typeof params !== "undefined") {
            queryParam = "?" + params;
        }
        if (typeof data !== "undefined") {
            method = "POST";
        }
        try {
            xhr.open(method, dbip.baseUrl + "/v2/" + dbip.apiKey + "/self" + queryParam);
        } catch (e) {
            return reject(e);
        }
        xhr.onload = ()=>{
            if (xhr.status === 200) {
                let res = JSON.parse(xhr.responseText);
                if (res.error) {
                    let errorMessage = "[" + res.errorCode + "] " + res.error;
                    console.log("API error : " + errorMessage);
                    return reject(errorMessage);
                }
                return resolve(res);
            } else {
                return reject();
            }
        }
        ;
        xhr.onerror = ()=>{
            return reject();
        }
        ;
        if (typeof data === "undefined") {
            xhr.send();
        } else {
            xhr.send(JSON.stringify(data));
        }
    }
    ),
};
if (!document.currentScript.hasAttribute("data-initialized")) {
    document.currentScript.setAttribute("data-initialized", "true");
    if (dbip.autoConvertCurrencies || dbip.autoSelectCountry) {
        let onLoad = ()=>{
            if (dbip.autoConvertCurrencies) {
                dbip.convertCurrencies();
            }
            if (dbip.autoSelectCountries) {
                dbip.autoSelectCountry();
            }
            if (dbip.euMemberCallback) {
                dbip.getVisitorInfo().then(info=>{
                    if (info.isEuMember) {
                        eval(dbip.euMemberCallback)();
                    }
                }
                )
            }
        }
        ;
        if (document.readyState === "complete") {
            onLoad();
        } else if (window.addEventListener) {
            window.addEventListener("load", onLoad);
        } else {
            window.attachEvent("onload", onLoad);
        }
    }
}

window.dbip = dbip;