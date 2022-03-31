
export class UserInfo {
  constructor({nameSelector, jobSelector}) {
    this._name = document.querySelector(nameSelector)
    this._job = document.querySelector(jobSelector)
  }

  getUserInfo() {
    return {
        name: this._name.textContent,
        job: this._job.textContent
    }
  }

  setUserInfo(title, job) {
      this._name.textContent = title;
      this._job.textContent = job;
  }
}