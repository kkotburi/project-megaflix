// (1) 작성한 정보 JSON 형식으로 localStorage에 적재하기
export const saveData = () => {
  // 입력값 변수 설정
  const movieId = document.querySelector(".moviebox").id;
  const writer = document.getElementById("writer").value;
  const password = document.getElementById("pwd").value;
  const average = document.getElementById("average").value;
  const part = document.getElementById("part").value;
  const comment = document.getElementById("comment").value;

  // 입력값 객체에 담기
  let uuid = self.crypto.randomUUID();
  let info = {
    movieId: movieId,
    buttonId: uuid,
    writer: writer,
    password: password,
    average: average,
    part: part,
    comment: comment,
  };

  // 기존 데이터 가져오기
  let storedData = localStorage.getItem("myData");
  let infoArray = [];

  // 기존 데이터가 존재하는 경우
  if (storedData !== null) {
    infoArray = JSON.parse(storedData);
  }

  // 새로운 데이터 추가
  infoArray.push(info);

  let jsonData = JSON.stringify(infoArray);
  localStorage.setItem("myData", jsonData);
};

// (2) n개의 이야기
const story = () => {
  // 저장된 데이터 가져오기
  let storedData = localStorage.getItem("myData");

  // 저장된 데이터가 있는 경우
  if (storedData !== null) {
    let infoArray = JSON.parse(storedData);

    // 필터링
    const urlParams = new URLSearchParams(window.location.search);
    const urlMovieId = urlParams.get("id");

    const filteredInfoArray = infoArray.filter(
      (data) => data.movieId === urlMovieId
    );

    const detail = document.querySelector(".detail");
    const h3 = document.createElement("h3");
    h3.innerHTML = `🎬 영화에 대한 <b>${filteredInfoArray.length}개</b>의 이야기가 있어요!`;
    detail.appendChild(h3);
  }
};
story();

// (3) localStarage에 적재된 데이터 가져와서 화면에 띄우기
export const printData = () => {
  // 저장된 데이터 가져오기
  let storedData = localStorage.getItem("myData");

  // 저장된 데이터가 있는 경우
  if (storedData !== null) {
    let infoArray = JSON.parse(storedData);

    // 필터링
    const urlParams = new URLSearchParams(window.location.search);
    const urlMovieId = urlParams.get("id");

    const filteredInfoArray = infoArray.filter(
      (data) => data.movieId === urlMovieId
    );

    // 관람평 목록 초기화
    const commentList = document.querySelector(".comment-list");
    commentList.innerHTML = "";

    // 필터링된 데이터를 가져와서 화면에 표기
    filteredInfoArray.reverse().forEach((info) => {
      const li = document.createElement("li");
      li.setAttribute("class", "comment");

      const user = document.createElement("div");
      user.setAttribute("class", "user");

      const userImg = document.createElement("div");
      userImg.setAttribute("class", "user-img");
      user.appendChild(userImg);

      const userId = document.createElement("p");
      userId.setAttribute("class", "user-id");
      userId.textContent = info.writer;
      user.appendChild(userId);

      const commentBox = document.createElement("div");
      commentBox.setAttribute("class", "comment-box");

      const commentPoint = document.createElement("div");
      commentPoint.setAttribute("class", "comment-point");
      commentPoint.innerHTML = `<span>${info.average}</span>`;
      commentBox.appendChild(commentPoint);

      const commentRecommend = document.createElement("div");
      commentRecommend.setAttribute("class", "comment-recommend");
      commentRecommend.innerHTML = `<em>${info.part}</em>`;
      commentBox.appendChild(commentRecommend);

      const commentTxt = document.createElement("div");
      commentTxt.setAttribute("class", "comment-txt");
      commentTxt.textContent = info.comment;
      commentBox.appendChild(commentTxt);

      const plus = document.createElement("div");
      plus.setAttribute("class", "plus");

      const editBtn = document.createElement("button");
      editBtn.setAttribute("class", "edit-btn");
      editBtn.textContent = "수정";
      editBtn.setAttribute("id", info.buttonId);
      editBtn.addEventListener("click", (event) => editComment(event));
      plus.appendChild(editBtn);

      const deleteBtn = document.createElement("button");
      deleteBtn.setAttribute("class", "delete-btn");
      deleteBtn.textContent = "삭제";
      deleteBtn.setAttribute("id", info.buttonId);
      deleteBtn.addEventListener("click", (event) => deleteComment(event));
      plus.appendChild(deleteBtn);

      li.appendChild(user);
      li.appendChild(commentBox);
      li.appendChild(plus);

      commentList.appendChild(li);
    });
  }
};
printData();

// (4) 관람평 등록 버튼을 누르면
//     입력사항 검사 후 saveData() => printData() 함수 실행하기
export const button = document.querySelector(".write_btn");
button.addEventListener("click", function (event) {
  event.preventDefault();

  const writer = document.getElementById("writer").value;
  const password = document.getElementById("pwd").value;
  const average = document.getElementById("average").value;
  const part = document.getElementById("part").value;
  const comment = document.getElementById("comment").value;

  // 사용자 입력 검사
  if (!writer || !password || !average || !part || !comment) {
    alert("항목을 모두 입력해주세요!");
    return;
  }
  if (!/^\d+$/.test(password)) {
    alert("비밀번호는 숫자로 입력해주세요");
    return;
  }
  if (password.length !== 4) {
    alert("비밀번호는 4자리로 입력해주세요");
    return;
  }

  saveData();
  printData();

  document.getElementById("writer").value = "";
  document.getElementById("pwd").value = "";
  document.getElementById("average").value = "⭐️";
  document.getElementById("part").value = "배우";
  document.getElementById("comment").value = "";

  window.location.reload();
});
printData();

// (5) 리뷰 삭제
const deleteComment = (event) => {
  // 비밀번호 입력 받기
  let password = prompt("비밀번호를 입력하세요");

  // 저장된 데이터 가져오기
  let storedData = localStorage.getItem("myData");

  // 저장된 데이터가 있는 경우
  if (storedData !== null) {
    let infoArray = JSON.parse(storedData);

    // buttonid와 localstorage의 buttonid가 같은지 확인
    const buttonId = event.target.id;
    const filteredComment = infoArray.find(
      (data) => data.buttonId === buttonId
    );

    // 비밀번호 확인
    if (filteredComment && filteredComment.password === password) {
      infoArray = infoArray.filter((data) => data.buttonId !== buttonId);
      let jsonData = JSON.stringify(infoArray);
      localStorage.setItem("myData", jsonData);

      printData();
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  }
  window.location.reload();
};

// (6) 리뷰 수정
const editComment = (event) => {
  // 비밀번호 입력 받기
  let password = prompt("비밀번호를 입력하세요");

  // 저장된 데이터 가져오기
  let storedData = localStorage.getItem("myData");

  // 저장된 데이터가 있는 경우
  if (storedData !== null) {
    let infoArray = JSON.parse(storedData);

    // buttonid와 localstorage의 buttonid가 같은지 확인
    const buttonId = event.target.id;
    const filteredComment = infoArray.find(
      (data) => data.buttonId === buttonId
    );

    // 비밀번호 확인
    if (filteredComment && filteredComment.password === password) {
      // 수정할 수 있는 모달창 띄우기
      const modal = document.querySelector(".modal-overlay");
      modal.style.display = "flex";

      // 모달창 안에 있는 수정 버튼 누르면 수정
      const changeBtn = document.querySelector(".change_btn");
      changeBtn.addEventListener("click", () => changeComment(buttonId));

      // 취소 버튼 누르면 모달창 꺼지기
      const closeBtn = document.querySelector(".close_btn");
      closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
      });
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  }
};

// localstorage에 저장된 값을 modal에서 입력 받은 값으로 바꿔주기
const changeComment = (buttonId) => {
  // 저장된 데이터 가져오기
  let storedData = localStorage.getItem("myData");

  // 저장된 데이터가 있는 경우
  if (storedData !== null) {
    let infoArray = JSON.parse(storedData);

    // buttonid와 localstorage의 buttonid가 같은지 확인
    const filteredComment = infoArray.find(
      (data) => data.buttonId === buttonId
    );

    // modal 입력값 가져오기
    const modalwriter = document.getElementById("modal-writer").value;
    const modalpassword = document.getElementById("modal-pwd").value;
    const modalaverage = document.getElementById("modal-average").value;
    const modalpart = document.getElementById("modal-part").value;
    const modalcomment = document.getElementById("modal-comment").value;

    //입력값 변경해주기
    filteredComment.writer = modalwriter;
    filteredComment.password = modalpassword;
    filteredComment.average = modalaverage;
    filteredComment.part = modalpart;
    filteredComment.comment = modalcomment;

    // 삭제해야 될 코멘트의 인덱스 찾기
    const findCommentIndex = infoArray.indexOf(filteredComment);

    // splice() 사용해서 해당 코멘트 삭제하고 filteredComment로 바꾸기
    infoArray.splice(findCommentIndex, 1, filteredComment);
    let jsonData = JSON.stringify(infoArray);
    localStorage.setItem("myData", jsonData);
  }
  window.location.reload();
};
