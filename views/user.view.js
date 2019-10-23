/**
 * @class View
 * 
 * Representasi visual dari modelnya
 */

class UserView {
  constructor () {
    this.app = this.getElement('#root');

    this.form = this.createElement('form');
    this.createInput({
      key: 'inputNama',
      type: 'text',
      placeholder: 'Nama',
      name: 'nama'
    });
    this.createInput({
      key: 'inputUmur',
      type: 'text',
      placeholder: 'Umur',
      name: 'umur'
    });

    this.tombolSubmit = this.createElement('button');
    this.tombolSubmit.textContent = 'Submit';

    this.form.append(this.inputNama, this.inputUmur, this.tombolSubmit);

    this.title = this.createElement('h1');
    this.title.textContent = 'Pengguna';
    this.listPengguna = this.createElement('ul', 'list-pengguna');
    this.app.append(this.title, this.form, this.listPengguna);

    this._teksUmurTemporari = '';
    this._initListenerLokal();
  }

  get _teksNama () {
    return this.inputNama.value;
  }

  get _teksUmur () {
    return this.inputUmur.value;
  }

  _resetInput () {
    this.inputNama.value = '';
    this.inputUmur.value = '';
  }

  createInput (
    { key, type, placeholder, name } = {
      key: 'default',
      type: 'text',
      placeholder: 'default',
      name: 'default'
    }
  ) {
    this[key] = this.createElement('input');
    this[key].type = type;
    this[key].placeholder = placeholder;
    this[key].name = name;
  }

  createElement (tag, namaClass) {
    const element = document.createElement(tag);

    if (namaClass) element.classList.add(namaClass);

    return element;
  }

  getElement (selector) {
    return document.querySelector(selector);
  }

  tampilkanPengguna (penggunas) {
    while (this.listPengguna.firstChild) {
      this.listPengguna.removeChild(this.listPengguna.firstChild);
    }

    if (penggunas.length === 0) {
      const p = this.createElement('p');
      p.textContent = "Belum bisa ngapa-ngapain! Mau tambah pengguna?";
      this.listPengguna.append(p);
    } else {
      penggunas.forEach(pengguna => {
        const li = this.createElement('li');
        li.id = pengguna.id;

        const checkbox = this.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = pengguna.komplet;

        const spanPengguna = this.createElement('span');

        const spanUmur = this.createElement('span');
        spanUmur.contentEditable = true;
        spanUmur.classList.add('editable');

        if (pengguna.komplet) {
          const coretNama = this.createElement('s');
          coretNama.textContent = pengguna.nama;
          spanPengguna.append(coretNama);

          const coretUmur = this.createElement('s');
          coretUmur.textContent = pengguna.umur;
          spanUmur.append(coretUmur);
        } else {
          spanPengguna.textContent = pengguna.nama;
          spanUmur.textContent = pengguna.umur;
        }

        const tombolDelete = this.createElement('button', 'hapus');
        tombolDelete.textContent = 'Hapus';
        li.append(checkbox, spanPengguna, spanUmur, tombolDelete);

        this.listPengguna.append(li);
      });
    }
  }

  _initListenerLokal () {
    this.listPengguna.addEventListener('input', event => {
      if (event.target.className === 'editable') {
        this._teksUmurTemporary = event.target.innerText;
      }
    });
  }

  bindTambahPengguna (handler) {
    this.form.addEventListener('submit', event => {
      event.preventDefault();

      if (this._teksNama) {
        handler({
          nama: this._teksNama,
          umur: this._teksUmur
        });
        this._resetInput();
      }
    });
  }

  bindDeletePengguna (handler) {
    this.listPengguna.addEventListener('click', event => {
      if (event.target.className === 'hapus') {
        const id = event.target.parentElement.id;

        handler(id);
      }
    });
  }

  bindEditPengguna (handler) {
    this.listPengguna.addEventListener('focusout', event => {
      if (this._teksUmurTemporari) {
        const id = event.target.parentElement.id;
        const key = 'umur';

        handler(id, { [key]: this._teksUmurTemporari });
        this._teksUmurTemporari = '';
      }
    });
  }

  bindTogglePengguna (handler) {
    this.listPengguna.addEventListener('change', event => {
      if (event.target.type === 'checkbox') {
        const id = event.target.parentElement.id;

        handler(id);
      }
    });
  }
}
