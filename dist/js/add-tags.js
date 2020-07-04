var input1 = document.querySelector("input[name=tags]");
// init Tagify script on the above inputs
tagify1 = new Tagify(input1, {
    whitelist: ["javascript .NET", "python", "C#", "C++"],
    blacklist: ["ahmed", "karem", "sayed"],
});