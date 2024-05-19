import Swal from 'sweetalert2'

export const toastAlert = ({ title, icon = 'success', timer = 1000 }) => {
  Swal.fire({
    position: 'top-end',
    title,
    icon,
    toast: true,
    showConfirmButton: false,
    timer
  })
}
