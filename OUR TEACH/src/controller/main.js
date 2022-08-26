var service = new Service();

function getEle(id) {
  return document.getElementById(id);
}

function fetchData() {

    //pending
    //showloading
   // getEle("loading").style.display = "block";
  service
  .getListMember()
   //truoc then catch ko duco cham ;
  .then(function (result) {
    //response
    //console.log(result.data);
    renderHTML(result.data);

    //hide loading
  //  getEle("loading").style.display = "none";
    
  })
  .catch(function (error) {
    //response
    console.log(error);
    
    //hide loading
  //  getEle("loading").style.display = "none";
  });


}
fetchData();

function renderHTML(data) {
  var content = "";
  data.forEach(function (member) {
    if(member.loaiND=="GV"){
    content += `
    <div class="team__item wow animate__animated animate__fadeIn">
                                <div class="team__item-content">
                                    <div class="team__item-img">
                                        <img src="./assets/img/${member.hinhAnh}" />
                                    </div>
                                    <div class="team__item-info">
                                        <p class="team__item-country">${member.ngonNgu}</p>
                                        <p class="team__item-name">${member.hoTen}</p>
                                        <p class="team__item-description">
                                        ${member.moTa}
                                        </p>
                                    </div>
                                </div>
                            </div>
    `;
    }
  });

  getEle("member_content").innerHTML = content;
}
