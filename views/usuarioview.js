const usuarioview = {
    template: `
    <div>
        <h3 class="d-flex justify-content-center">Registro de usuarios</h3>
        <button type="button" class="btn btn-secondary m-2 fload-end"
        data-bs-toggle="modal" data-bs-target="#createModal" @click="addClick()">
            Agregar usuarios
        </button>
       
        <div class="modal fade" id="createModal" tabindex="-1"
            aria-labelledby="createModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="createModalLabel">{{modalTitle}}</h5>
                        <button type="button" class="close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="input-group mb-3">
                            <span class="input-group-text">Nombre</span>
                            <input type="text" class="form-control" v-model="nombre" placeholder="Escriba el nombre del usuario">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Usuario</span>
                            <input type="text" class="form-control" v-model="usuario" placeholder="Escriba el usuario">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Correo</span>
                            <input type="text" class="form-control" v-model="correo" placeholder="Escriba el correo">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Contraseña</span>
                            <input type="password" class="form-control" v-model="contraseña" placeholder="Escriba su contraseña">
                        </div> 
                        <button type="button" @click="createClick()"
                        class="btn btn-secondary">
                            Crear Usuario
                        </button>                   
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,

    data() {
        return {
            usuarios: [],
            modalTitle: '',
            nombre: '',
            usuario: '',
            correo: '',
            contraseña: '',
            usuario_id: 0
        }
    },
    methods: {
        addClick() {
            this.modalTitle = 'Agregar Usuarios';
            this.usuario_id = 0;
            this.nombre = '';
            this.usuario = '';
            this.correo = '';
            this.contraseña = '';
        },
        createClick() {
            axios.post(variables.API_URL + 'usuario', {
                nombre: this.nombre,
                usuario: this.usuario,
                correo: this.correo,
                contraseña: this.contraseña
            })
            .then(response => {
                alert('Usuario creado con exito!', response.data);
            });
        },
    }
}