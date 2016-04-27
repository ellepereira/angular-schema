export class QueryBuilder {

  constructor(execCb, head) {
    this.next = null;
    this.head = head;
    this.http = http;
    this.query = {};
  }

  find(params) {

    if (this.http.method === null) {
      this.query.method = 'GET';
      this.query.params = params;
      return this;
    }
    else {
      var nextQuery = new HttpQuery(this.http, this.head || this);
      this.next = nextQuery;
      return nextQuery.find(params);
    }

  }

  where(field, value) {
    var whereObj = {};
    whereObj[field] = value;
    Object.assign(this.query.params, whereObj);
  }

  exec() {

    var results = [],
        headExecuted;

    if (this.next) {
      headExecuted = true;
      return this.http(this.query).then(function(data) {
        results.push(data);
        return this.next.exec();
      });
    }
    else {
      if (headExecuted === true) {
        return this.head.exec();
      }
    }
  }

}
