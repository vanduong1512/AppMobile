var URL = 'http://iv.paomart.com/api/Inventory/SearchItems';

var response = {
    getResult() {
        return fetch(URL, {
            method: 'POST',
            headers: {
                Accept: 'application/json', 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Location: 0,
                Category: 0,
                Subcategory: 0
            }),
        }).then((response) => response.json())
    }
};

export default response;