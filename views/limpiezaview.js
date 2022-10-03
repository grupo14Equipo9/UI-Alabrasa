const limpiezaview = {
    template: `
    <div>
        <h3 class="d-flex justify-content-center">Inventario de Limpieza</h3>
        <button type="button" class="btn btn-secondary m-2 fload-end"
        data-bs-toggle="modal" data-bs-target="#createModal" @click="addClick()">
            Agregar producto limpieza
        </button>
        <table class="table table-striped">
            <thead>
                <tr>         
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Cantidad</th>                 
                    <th>Precio</th>
                    <th>Proveedor</th>
                    <th>Opciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="limpieza in pro_limpieza">
                    <td>{{limpieza.id_pro_limpieza}}</td>
                    <td>{{limpieza.nombre}}</td>
                    <td>{{limpieza.cantidad}}</td>
                    <td>{{limpieza.precio}}</td>
                    <td>{{limpieza.proveedor}}</td>
                    <td>
                        <button type="button" 
                        class="btn btn-dark mr-1"
                        data-bs-toggle="modal" data-bs-target="#updateModal" 
                        @click="editClick(limpieza)">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                        <button type="button" 
                        class="btn btn-dark mr-1"
                        @click="deleteClick(limpieza.id_pro_limpieza)">                     
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
                            <span class="input-group-text">Cantidad</span>
                            <input type="number" class="form-control" v-model="cantidad">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Precio</span>
                            <input type="number" class="form-control" v-model="precio">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Proveedor</span>
                            <input type="text" class="form-control" v-model="proveedor">
                        </div>
                        <button type="button" @click="createClick()"
                        class="btn btn-secondary">
                            Crear producto limpieza
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
                            <span class="input-group-text">ID producto</span>
                            <input type="number" class="form-control" v-model="id_pro_limpieza" readonly>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Nombre producto</span>
                            <input type="text" class="form-control" v-model="nombre" placeholder="Escriba el nombre del producto de limpieza">
                        </div>                   
                        <div class="input-group mb-3">
                            <span class="input-group-text">Cantidad</span>
                            <input type="number" class="form-control" v-model="cantidad">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Precio</span>
                            <input type="number" class="form-control" v-model="precio">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Proveedor</span>
                            <input type="text" class="form-control" v-model="proveedor">
                        </div>
                        <button type="button" @click="updateClick()"
                        class="btn btn-secondary">
                            Actualizar producto de limpieza
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,

    data() {
        return {
            pro_limpieza: [],
            modalTitle: '',
            nombre: '',
            cantidad: 0,
            precio: 0,
            proveedor: '',
            id_pro_limpieza: 0
        }
    },
    methods: {
        getProductos() {
            axios.get(variables.API_URL + 'limpieza')
            .then(response => {
                this.pro_limpieza = response.data;
            });
        },
        addClick() {
            this.modalTitle = 'Agregar producto';
            this.id_pro_limpieza = 0;
            this.nombre = '';
            this.cantidad = 0;
            this.precio = 0;
            this.proveedor = '';
        },
        editClick(limpieza) {
            this.modalTitle = 'Actualizar producto';
            this.id_pro_limpieza = limpieza.id_pro_limpieza;
            this.nombre = limpieza.nombre;
            this.cantidad = limpieza.cantidad;
            this.precio = limpieza.precio;
            this.proveedor = limpieza.proveedor;
        },
        createClick() {
            axios.post(variables.API_URL + 'limpieza', {
                nombre: this.nombre,
                cantidad: this.cantidad,
                precio: this.precio,
                proveedor: this.proveedor
            })
            .then(response => {
                this.getProductos();
                alert('Producto creado con exito!', response.data);
            });
        },
        updateClick() {
            axios.put(variables.API_URL + 'limpieza', {
                id_pro_limpieza: this.id_pro_limpieza,
                nombre: this.nombre,
                cantidad: this.cantidad,
                precio: this.precio,
                proveedor: this.proveedor
            })
            .then(response => {
                this.getProductos();
                alert('Producto actualizado con exito!', response.data);
            });
        },
        deleteClick(id_pro_limpieza) {
            if(!confirm('¿Esta seguro de eliminar el producto?')) {
                return;
            }
            axios.delete(variables.API_URL + 'limpieza/' + id_pro_limpieza)
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