const cocinaview = {
    template: `
    <div>
        <h3 class="d-flex justify-content-center">Inventario de Cocina</h3>
        <button type="button" class="btn btn-secondary m-2 fload-end"
        data-bs-toggle="modal" data-bs-target="#createModal" @click="addClick()">
            Agregar producto
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
                <tr v-for="cocina in pro_cocina">
                    <td>{{cocina.id_pro_cocina}}</td>
                    <td>{{cocina.nombre}}</td>
                    <td>{{cocina.cantidad}}</td>
                    <td>{{cocina.precio}}</td>
                    <td>{{cocina.proveedor}}</td>
                    <td>
                        <button type="button" 
                        class="btn btn-dark mr-1"
                        data-bs-toggle="modal" data-bs-target="#updateModal" 
                        @click="editClick(cocina)">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                        <button type="button" 
                        class="btn btn-dark mr-1"
                        @click="deleteClick(cocina.id_pro_cocina)">                     
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
                            Crear producto
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
                            <input type="number" class="form-control" v-model="id_pro_cocina" readonly>
                        </div>
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
                        <button type="button" @click="updateClick()"
                        class="btn btn-secondary">
                            Actualizar producto
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,

    data() {
        return {
            pro_cocina: [],
            modalTitle: '',
            nombre: '',
            cantidad: 0,
            precio: 0,
            proveedor: '',
            id_pro_cocina: 0
        }
    },
    methods: {
        getProductos() {
            axios.get(variables.API_URL + 'cocina')
            .then(response => {
                this.pro_cocina = response.data;
            });
        },
        addClick() {
            this.modalTitle = 'Agregar producto';
            this.id_pro_cocina = 0;
            this.nombre = '';
            this.cantidad = 0;
            this.precio = 0;
            this.proveedor = '';
        },
        editClick(cocina) {
            this.modalTitle = 'Actualizar producto';
            this.id_pro_cocina = cocina.id_pro_cocina;
            this.nombre = cocina.nombre;
            this.cantidad = cocina.cantidad;
            this.precio = cocina.precio;
            this.proveedor = cocina.proveedor;
        },
        createClick() {
            axios.post(variables.API_URL + 'cocina', {
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
            axios.put(variables.API_URL + 'cocina', {
                id_pro_cocina: this.id_pro_cocina,
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
        deleteClick(id_pro_cocina) {
            if(!confirm('¿Esta seguro de eliminar el producto?')) {
                return;
            }
            axios.delete(variables.API_URL + 'cocina/' + id_pro_cocina)
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