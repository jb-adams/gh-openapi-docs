const defaults = {
    redoc: {
        options: {
            theme: {
                colors: {
                    primary: {
                        main: '#2f75bb'
                    },
                    warning: {
                        main: '#faa633'
                    },
                    http: {
                        get: '#73AD25',
                        post: '#4faedc',
                        put: '#9f79b0',
                        delete: '#e34a3a'
                    }
                },
                typography: {
                    fontSize: '16px'
                },
                sidebar: {
                    backgroundColor: '#F5F7F9'
                }
            }
        }
    }
}

Object.freeze(defaults);
export default defaults;