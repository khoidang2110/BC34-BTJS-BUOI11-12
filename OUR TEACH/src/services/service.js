function Service() {
    // tao mang de catch data 
//this.arr = [];

  this.getListMember = function () {
    /**
     * Promise (lời hứa)
     *  - Pending ( chờ)
     *  - Resolve (Thành công)
     *  - Reject (Thất hứa)
     */

    //request bat dong bo: non-synchronous
     return axios({
      url: "https://6302e6ca9eb72a839d755c30.mockapi.io/cyberphone/member",
      method: "GET",
    });
     
     
  };
}
