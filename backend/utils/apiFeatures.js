class APIFeatures {
    // the query is for example the product find and it will work off of a keyword so it will be find product.keyword.
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        // ? = if the exsits in the code.
        const keyword= this.queryStr.keyword ? {
                name: {
                    $regex: this.queryStr.keyword,
                    // 'i' under the $options call means it is case incenative.
                    $options : 'i'
                }
        } : {}
        
        console.log(keyword);

        this.query = this.query.find({...keyword});
        return this;
    }
    filter() {

        const queryCopy = { ...this.queryStr };

        
        //removing firlds from the query string
        // [el] or el is a indentfier to refer to a DOM element that is a convention in this library.
        const removeFields = ['keyword', 'limit', 'page']
        removeFields.forEach(el => delete queryCopy[el]);

        //Advanced filter for price, ratings,etc...
        // the stringify function is converting the function into a string
        let queryStr = JSON.stringify(queryCopy)
        // the (/\b()\b/g) is = to agroup that this will dealing with 
        //this function is just to put the $ sign in front of the value that there searching for.
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match =>`$${match}`)


        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        // this is doing the math on how many results it has to skip due to which page it is on and how many items we display per page.
        const skip = resPerPage * (currentPage - 1);

        this. query = this.query.limit(resPerPage).skip(skip);

        return this;
    }
}

module.exports = APIFeatures