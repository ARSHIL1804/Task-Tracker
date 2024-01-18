const defaultExcludedItemsFromResponse = [ '__v', 'userPassword', '_id' ];

class HttpResponse {
    error = false;
    responseTimestamp = new Date();

    constructor(data, options={'totalCount': 0, 'statusCode': 200, 'deleted': null}) {
        this.statusCode = options.statusCode || 200;
        let filteredData = data;

        if ( typeof ( filteredData ) === 'object' ) {
            filteredData = this.filterData( JSON.parse( JSON.stringify( filteredData ) ) );
        }
        if ( options.deleted ) {
            this.deleted = options.deleted;
        }
        if ( Array.isArray( filteredData ) ) {
            this.data = [ ...filteredData ];
            this.totalCount = options.totalCount || undefined;
        } else if ( typeof ( filteredData ) === 'object' ) {
            this.data = { ...filteredData };
        } else {
            this.data = data;
        }
    }

    filterData(data) {
        if (Array.isArray(data)) {
            return data.map(item => this.removeKeys(item));
        } else if (typeof data === 'object' && data !== null) {
            return this.removeKeys(data);
        }
        return data;
    }

    removeKeys(obj) {
        if (typeof obj !== 'object' || obj === null) {
            return obj;
        }
        if (Array.isArray(obj)) {
            return obj.map(item => this.removeKeys(item));
        }
        Object.keys(obj).forEach(key => {
            if (defaultExcludedItemsFromResponse.includes(key)) {
                delete obj[key];
            } else {
                obj[key] = this.removeKeys(obj[key]);
            }
        });
        return obj;
    }
}

module.exports = { HttpResponse };
