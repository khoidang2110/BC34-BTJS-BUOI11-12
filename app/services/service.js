function Service() {
    this.getListUser = function () {
      return axios({
        url: "https://6302e6ca9eb72a839d755c30.mockapi.io/cyberphone/member/",
        method: "GET",
      });
    };
  
    this.deleteUserApi = function (id) {
     return axios({
          url:"https://6302e6ca9eb72a839d755c30.mockapi.io/cyberphone/member/" + id,
          method: "DELETE",
      });
    };
  
    this.addUserApi = function(user){
      return axios({
          url:"https://6302e6ca9eb72a839d755c30.mockapi.io/cyberphone/member/",
          method: "POST",
          data: user,
      });
    };
    this.getUserById = function(id){
      return axios({
          url:`https://6302e6ca9eb72a839d755c30.mockapi.io/cyberphone/member/${id}`,
          method: "GET",
      });
    };
    this.updateUserApi = function(user){
      return axios({
          url:`https://6302e6ca9eb72a839d755c30.mockapi.io/cyberphone/member/${user.id}`,
          method:"PUT",
          data:user,
      });
      
    };
  }
  