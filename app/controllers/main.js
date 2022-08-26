
var validation = new Validation();
var service = new Service();

function getEle(id){
    return document.getElementById(id);
}

function fetchData(){
service.getListUser()

.then(function(result){
   renderHTML(result.data);
})
.catch(function(error){
    console.log(error);
});
}
fetchData();

function renderHTML(data){
    var content = ``;
    data.forEach(function(user,index){
        content+=`
        <tr>
            <td>${index+1}</td>
            <td>${user.taiKhoan}</td>
            <td>${user.matKhau}</td>
            <td>${user.hoTen}</td>
            <td>${user.email}</td>
            <td>${user.ngonNgu}</td>
            <td>${user.loaiND}</td>
            <td>
            <button class="btn btn-info"  data-toggle="modal" data-target="#myModal" onclick="editUser(${user.id})">Edit</button>
            <button class="btn btn-danger" onclick="deleteUser(${user.id})">Delete</button>
           
            </td>
        </tr>
        `
    } );
    getEle("tblDanhSachNguoiDung").innerHTML = content;
}

/**
 * Delete
 */

function deleteUser(id){
   service.deleteUserApi(id)
   .then(function(){
    //render list data
   fetchData();
   
   })
   .catch(function(error){
    console.log(error);
   });
}

getEle("btnThemNguoiDung").addEventListener("click", function(){
    //Sửa title
    //dom class phan tu thu 0
    document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm User";

    //tạo nút "add"
    var btnAdd = `<button class="btn btn-success" onclick="addUser()">Add</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = btnAdd;

    getEle("TaiKhoan").value = '';
getEle("HoTen").value = '';
getEle("MatKhau").value = '';
getEle("Email").value = '';
getEle("HinhAnh").value = '';
getEle("loaiNguoiDung").value = '';
getEle("loaiNgonNgu").value = '';
getEle("MoTa").value = '';
});

/**
 * Add user
 */

function addUser(){
var taiKhoan = getEle("TaiKhoan").value;
var hoTen = getEle("HoTen").value;
var matKhau = getEle("MatKhau").value;
var email = getEle("Email").value;
var hinhAnh = getEle("HinhAnh").value;
var loaiND = getEle("loaiNguoiDung").value;
var ngonNgu = getEle("loaiNgonNgu").value;
var moTa =getEle("MoTa").value;

var isValid = true;

isValid &=
      validation.kiemTraRong(
        taiKhoan,
        "tbTaiKhoan",
        "(*) Vui lòng nhập tài khoản"
      );
isValid &=
validation.kiemTraRong(hoTen, "tbHoTen", "(*) Vui lòng nhập tên") &&
validation.kiemTraKiTuChuoi(hoTen, "tbHoTen", "(*) Vui lòng chỉ nhập chữ");

isValid &=
validation.kiemTraRong(
  matKhau,
  "tbMatKhau",
  "(*) Vui lòng nhập mật khẩu"
) &&
validation.kiemTraKiTuDacBiet(
  matKhau,
  "tbMatKhau",
  "(*) Vui lòng nhập kí tự đặc biệt"
) &&
validation.kiemTraDoDaiKiTu(
  matKhau,
  "tbMatKhau",
  "(*) Vui lòng nhập từ 6-8 kí tự",
  6,
  8
);
isValid &=
validation.kiemTraRong(email, "tbEmail", "(*) Vui lòng nhập email") &&
validation.kiemTraEmail(
  email,
  "tbEmail",
  "(*) Vui lòng nhập đúng định dạng email"
);

isValid &=
validation.kiemTraRong(hinhAnh, "tbHinhAnh", "(*) Vui lòng không để trống");
isValid &= validation.checkSelect(
    "loaiNguoiDung",
    "tbLoaiNguoiDung",
    "(*) Vui lòng chọn loại người dùng"
    );
    isValid &= validation.checkSelect(
        "loaiNgonNgu",
        "tbLoaiNgonNgu",
        "(*) Vui lòng chọn loại ngôn ngữ"
        );


isValid &=
validation.kiemTraRong(moTa, "tbMoTa", "(*) Vui lòng không để trống") &&
validation.kiemTraDoDaiKiTu(
  moTa,
  "tbMoTa",
  "(*)Vui lòng nhập từ 1-60 ký tự",
  1,
  60
);

///cach phu dinh chi 1 dong
 if (!isValid) return null;

 


   // up len mock ko can id, backend lo
   var user = new User("",hinhAnh,ngonNgu,hoTen,moTa,taiKhoan,matKhau,email,loaiND);
   service.addUserApi(user)
   .then(function(){
    //them xong goi lai lam fetch de lam moi
fetchData();
//dong modal
getEle("TaiKhoan").value = '';
getEle("HoTen").value = '';
getEle("MatKhau").value = '';
getEle("Email").value = '';
getEle("HinhAnh").value = '';
getEle("loaiNguoiDung").value = '';
getEle("loaiNgonNgu").value = '';
getEle("MoTa").value = '';

document.getElementsByClassName("close")[0].click();
   })
   .catch(function(error){
    console.log(error);
   })
}

/**
 * Edit user
 */
function editUser(id){
    document.getElementsByClassName("modal-title")[0].innerHTML = "Update User";

    var btnUpdate = `<button class="btn btn-success" onclick="updateUser(${id})">Update</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = btnUpdate;
    
    service.getUserById(id)
   .then(function(result){
  

getEle("TaiKhoan").value = result.data.taiKhoan;
getEle("HoTen").value = result.data.hoTen;
getEle("MatKhau").value = result.data.matKhau;
getEle("Email").value = result.data.email;
getEle("HinhAnh").value = result.data.hinhAnh;
getEle("loaiNguoiDung").value = result.data.loaiND;
getEle("loaiNgonNgu").value = result.data.ngonNgu;
getEle("MoTa").value = result.data.moTa;
   
   })
   .catch(function(error){
    console.log(error);
   });

   
}

/**
 * Update User
 */

function updateUser(id){
    var taiKhoan = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var matKhau = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var hinhAnh = getEle("HinhAnh").value;
    var loaiND = getEle("loaiNguoiDung").value;
    var ngonNgu = getEle("loaiNgonNgu").value;
    var moTa =getEle("MoTa").value;
    
    var isValid = true;

isValid &=
      validation.kiemTraRong(
        taiKhoan,
        "tbTaiKhoan",
        "(*) Vui lòng nhập tài khoản"
      );
isValid &=
validation.kiemTraRong(hoTen, "tbHoTen", "(*) Vui lòng nhập tên") &&
validation.kiemTraKiTuChuoi(hoTen, "tbHoTen", "(*) Vui lòng chỉ nhập chữ");

isValid &=
validation.kiemTraRong(
  matKhau,
  "tbMatKhau",
  "(*) Vui lòng nhập mật khẩu"
) &&
validation.kiemTraKiTuDacBiet(
  matKhau,
  "tbMatKhau",
  "(*) Vui lòng nhập kí tự đặc biệt"
) &&
validation.kiemTraDoDaiKiTu(
  matKhau,
  "tbMatKhau",
  "(*) Vui lòng nhập từ 6-8 kí tự",
  6,
  8
);
isValid &=
validation.kiemTraRong(email, "tbEmail", "(*) Vui lòng nhập email") &&
validation.kiemTraEmail(
  email,
  "tbEmail",
  "(*) Vui lòng nhập đúng định dạng email"
);

isValid &=
validation.kiemTraRong(hinhAnh, "tbHinhAnh", "(*) Vui lòng không để trống");
isValid &= validation.checkSelect(
    "loaiNguoiDung",
    "tbLoaiNguoiDung",
    "(*) Vui lòng chọn loại người dùng"
    );
    isValid &= validation.checkSelect(
        "loaiNgonNgu",
        "tbLoaiNgonNgu",
        "(*) Vui lòng chọn loại ngôn ngữ"
        );


isValid &=
validation.kiemTraRong(moTa, "tbMoTa", "(*) Vui lòng không để trống") &&
validation.kiemTraDoDaiKiTu(
  moTa,
  "tbMoTa",
  "(*)Vui lòng nhập từ 1-60 ký tự",
  1,
  60
);

///cach phu dinh chi 1 dong
 if (!isValid) return null;
     
    
    
       // up len mock ko can id, backend lo
       var user = new User(id,hinhAnh,ngonNgu,hoTen,moTa,taiKhoan,matKhau,email,loaiND);

   service.updateUserApi(user)
   .then(function(){
    fetchData();

getEle("TaiKhoan").value = '';
getEle("HoTen").value = '';
getEle("MatKhau").value = '';
getEle("Email").value = '';
getEle("HinhAnh").value = '';
getEle("loaiNguoiDung").value = '';
getEle("loaiNgonNgu").value = '';
getEle("MoTa").value = '';
    //dong modal
document.getElementsByClassName("close")[0].click();
   })
   .catch(function(error){
    console.log(error);
   })
}