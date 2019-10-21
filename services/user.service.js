/**
 * @class Service
 * 
 * Kelola data aplikasi
 */

class UserService {
  constructor () {
    const penggunas = JSON.parse(localStorage.getItem('penggunas')) || [];
    this.penggunas = penggunas.map(pengguna => new User(pengguna));
  }

  bindListPenggunaBerubah (callback) {
    this.onListPenggunaBerubah = callback;
  }

  _commit (penggunas) {
    this.onListPenggunaBerubah(penggunas);
    localStorage.setItem('penggunas', JSON.stringify(penggunas));
  }

  tambah (pengguna) {
    this.penggunas.push(new User(pengguna));

    this._commit(this.penggunas);
  }

  edit (id, penggunaYangDiedit) {
    this.penggunas = this.penggunas.map(pengguna =>
      pengguna.id === id
        ? new User({
            ...pengguna,
            ...penggunaYangDiedit
          })
        : pengguna
    );

    this._commit(this.penggunas);
  }

  delete (_id) {
    this.penggunas = this.penggunas.filter(({ id }) => id !== _id);

    this._commit(this.penggunas);
  }

  toggle (_id) {
    this.penggunas = this.penggunas.map(pengguna =>
      pengguna.id === _id ? new User({ ...pengguna, komplet: !user.komplet }) : pengguna
    );

    this._commit(this.penggunas);
  }
}
