/**
 * @class Controller
 * 
 * Menghubungkan input pengguna dan output tampilan
 * 
 * @param model
 * @param view
 */

class UserController {
  constructor (userService, userView) {
    this.userService = userService;
    this.userView = userView;

    this.userService.bindListPenggunaBerubah(this.onListPenggunaBerubah);
    this.userView.bindTambahPengguna(this.handleTambahPengguna);
    this.userView.bindEditPengguna(this.handleEditPengguna);
    this.userView.bindDeletePengguna(this.handleDeletePengguna);
    this.userView.bindTogglePengguna(this.handleTogglePengguna);

    this.onListPenggunaBerubah(this.userService.penggunas);
  }

  onListPenggunaBerubah = penggunas => {
    this.userView.tampilkanPengguna(penggunas);
  };

  handleTambahPengguna = pengguna => {
    this.userService.tambah(pengguna);
  };

  handleEditPengguna = (id, pengguna) => {
    this.userService.edit(id, pengguna);
  };

  handleDeletePengguna = id => {
    this.userService.delete(id);
  };

  handleTogglePengguna = id => {
    this.userService.toggle(id);
  }
}
