/**
 * @class Model
 * 
 * Kelola data aplikasi
 */

class User {
  constructor ({ nama, umur, komplet } = { komplet: false }) {
    this.id = this.uuidv4();
    this.nama = nama;
    this.umur = umur;
    this.komplet = komplet;
  }

  uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }
}
