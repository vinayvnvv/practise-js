class UtilsClass {
    loadLibraries(libs) { //return (total, loaded)
        return new Promise((res) => {
            let errs = 0;
            let total = 0;
            if(libs && Array.isArray(libs)) {
                for(let i=0; i<libs.length; i++) {
                    const exists = document.getElementById(libs[i].id);
                    if(!exists) {
                        const lib = libs[i];
                        const script = document.createElement('script');
                        script.type = 'text/javascript';
                        script.async = true;
                        script.id = lib.id;
                        script.onload = () => {
                            total += 1;
                            if(total === libs.length) {
                                res({total, errs});
                            }
                        };
                        script.onerror = () => {
                            total += 1;
                            errs =+ 1;
                            if(total === libs.length) {
                                res({total, errs});
                            }
                        };
                        script.src = lib.src;
                        document.getElementsByTagName('head')[0].appendChild(script);
                    } else {
                        total += 1;
                        if(total === libs.length) {
                            res({total, errs});
                        }
                    }
                    
                } 
            } else {
                res({total: 0, errs: 0});
            }
        });
    }
    removeLibrary(lib) {
        const exists = document.getElementById(lib.id);
        if(exists) {
            exists.parentElement.removeChild(exists);
        }
    }
}
export const utils = new UtilsClass;