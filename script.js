// 회원가입 저장 (임시 기능)
document.getElementById("signupForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const id = document.getElementById("signupId").value;
    const pw = document.getElementById("signupPw").value;

    localStorage.setItem("userId", id);
    localStorage.setItem("userPw", pw);

    alert("회원가입 완료!");
    window.location.href = "index.html";
});

// 로그인 확인
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const id = document.getElementById("loginId").value;
    const pw = document.getElementById("loginPw").value;

    if (id === localStorage.getItem("userId") && pw === localStorage.getItem("userPw")) {
        window.location.href = "home.html";
    } else {
        alert("아이디 또는 비밀번호가 틀렸습니다.");
    }
});
