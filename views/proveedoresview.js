const proveedoresview = {
    template: `
    <div>
        <h3 class="d-flex justify-content-center">Proveedores</h3>
        <button type="button" class="btn btn-secondary m-2 fload-end"
        data-bs-toggle="modal" data-bs-target="#createModal" @click="addClick()">
            Añadir proveedor
        </button>
        <table class="table table-striped">
            <thead>
                <tr>         
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Telefono</th>                 
                    <th>Dirección</th>
                    <th>Correo</th>
                    <th>Producto</th>
                    <th>Fecha</th>
                    <th>Precio total</th>
                    <th>Opciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="proveedor in proveedores">
                    <td>{{proveedor.id_proveedor}}</td>
                    <td>{{proveedor.nombre}}</td>
                    <td>{{proveedor.telefono}}</td>
                    <td>{{proveedor.direccion}}</td>
                    <td>{{proveedor.correo}}</td>
                    <td>{{proveedor.producto}}</td>
                    <td>{{proveedor.fecha}}</td>
                    <td>{{proveedor.precio_total}}</td>
                    <td>
                        <button type="button" 
                        class="btn btn-dark mr-1"
                        data-bs-toggle="modal" data-bs-target="#updateModal" 
                        @click="editClick(proveedor)">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                        <button type="button" 
                        class="btn btn-dark mr-1"
                        @click="deleteClick(proveedor.id_proveedor)">                     
                            <i class="bi bi-trash-fill"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
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
                            <span class="input-group-text">Nombre producto</span>
                            <input type="text" class="form-control" v-model="nombre" placeholder="Escriba el nombre del producto">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Telefono</span>
                            <input type="number" class="form-control" v-model="telefono">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Dirreción</span>
                            <input type="text" class="form-control" v-model="direccion">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Correo</span>
                            <input type="text" class="form-control" v-model="correo">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Producto</span>
                            <input type="text" class="form-control" v-model="producto">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Fecha</span>
                            <input type="date" class="form-control" v-model="fecha">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Precio total</span>
                            <input type="number" class="form-control" v-model="precio_total">
                        </div>
                        <button type="button" @click="createClick()"
                        class="btn btn-secondary">
                            Añadir proveedor
                        </button>                   
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="updateModal" tabindex="-1"
            aria-labelledby="updateModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="updateModalLabel">{{modalTitle}}</h5>
                        <button type="button" class="close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="input-group mb-3">
                            <span class="input-group-text">ID proveedor</span>
                            <input type="number" class="form-control" v-model="id_proveedor" readonly>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Nombre producto</span>
                            <input type="text" class="form-control" v-model="nombre" placeholder="Escriba el nombre del producto">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Telefono</span>
                            <input type="number" class="form-control" v-model="telefono">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Dirreción</span>
                            <input type="text" class="form-control" v-model="direccion">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Correo</span>
                            <input type="text" class="form-control" v-model="correo">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Producto</span>
                            <input type="text" class="form-control" v-model="producto">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Fecha</span>
                            <input type="date" class="form-control" v-model="fecha">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Precio total</span>
                            <input type="number" class="form-control" v-model="precio_total">
                        </div>
                        <button type="button" @click="updateClick()"
                        class="btn btn-secondary">
                            Actualizar proveedor
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,

    data() {
        return {
            proveedores: [],
            modalTitle: '',
            nombre: '',
            telefono: '',
            direccion: '',
            correo: '',
            producto: '',
            fecha: '',
            precio_total: '',
            id_proveedor: 0
        }
    },
    methods: {
        getProductos() {
            axios.get(variables.API_URL + 'proveedor')
            .then(response => {
                this.proveedores = response.data;
            });
        },
        addClick() {
            this.modalTitle = 'Agregar producto';
            this.id_proveedor = 0;
            this.nombre = '';
            this.telefono = '';
            this.direccion = '';
            this.correo = '';
            this.producto = '';
            this.fecha = '';
            this.precio_total = '';
        },
        editClick(proveedor) {
            this.modalTitle = 'Actualizar producto';
            this.id_proveedor = proveedor.id_proveedor;
            this.nombre = proveedor.nombre;
            this.telefono = proveedor.telefono;
            this.direccion = proveedor.direccion;
            this.correo = proveedor.correo;
            this.producto = proveedor.producto;
            this.fecha = proveedor.fecha;
            this.precio_total = proveedor.precio_total;
        },
        createClick() {
            axios.post(variables.API_URL + 'proveedor', {
                nombre: this.nombre,
                telefono: this.telefono,
                direccion: this.direccion,
                correo: this.correo,
                producto: this.producto,
                fecha: this.fecha,
                precio_total: this.precio_total
            })
            .then(response => {
                this.getProductos();
                alert('Producto creado con exito!', response.data);
            });
        },
        updateClick() {
            axios.put(variables.API_URL + 'proveedor', {
                id_proveedor: this.id_proveedor,
                nombre: this.nombre,
                telefono: this.telefono,
                direccion: this.direccion,
                correo: this.correo,
                producto: this.producto,
                fecha: this.fecha,
                precio_total: this.precio_total
            })
            .then(response => {
                this.getProductos();
                alert('Producto actualizado con exito!', response.data);
            });
        },
        deleteClick(id_proveedor) {
            if(!confirm('¿Esta seguro de eliminar el producto?')) {
                return;
            }
            axios.delete(variables.API_URL + 'proveedor/' + id_proveedor)
            .then(response => {
                this.getProductos();
                alert('Producto eliminado con exito!', response.data);
            });
        }
    },
    mounted:function() {
        this.getProductos();
    }
}