<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Users Table</h3>
            <div class="card-tools">
               <button class="btn btn-success" data-toggle="modal" data-target="#exampleModalCenter">Add New <i class="fas fa-user-plus"></i></button>
            </div>
          </div>
          <!-- /.card-header -->
          <div class="card-body table-responsive p-0">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Type</th>
                  <th>Bio</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                
                <tr v-for="user in users" :key="user.id" >
                  <td>{{ 1+1 }}</td>
                  <td>{{user.name}}</td>
                  <td>{{user.email}} </td>
                  <td>{{user.type | upText}}</td>
                  <td>{{user.bio}}</td>
                  <td>
                    <a href="#">
                      <i class="fa fa-eye green"></i> </a
                    >/

                    <a href="#">
                      <i class="fa fa-edit blue"></i> </a
                    >/

                    <a href="#">
                      <i class="fa fa-trash red"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- /.card-body -->
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">New User</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="createUser">
                    <div class="modal-body">
                    
                        <div class="form-group">
                            <input v-model="form.name" 
                                type="text" name="name"
                                placeholder="name"
                                class="form-control" 
                                :class="{ 'is-invalid': form.errors.has('name') }"
                            >
                            <has-error :form="form" field="name"></has-error>
                        </div>

                        <div class="form-group">
                            <input v-model="form.email" 
                                type="email" name="email"
                                placeholder="email"
                                class="form-control" 
                                :class="{ 'is-invalid': form.errors.has('email') }"
                            >
                            <has-error :form="form" field="email"></has-error>
                        </div>

                        <div class="form-group">
                            <textarea v-model="form.bio" 
                                type="text" name="bio"
                                id="bio"
                                placeholder="Short bio for user and this is optional"
                                class="form-control" 
                                :class="{ 'is-invalid': form.errors.has('bio') }"
                            >
                            </textarea>
                            <has-error :form="form" field="bio"></has-error>
                        </div>
                    

                        <div class="form-group">
                            <select v-model="form.type" 
                                name="type"
                                id="type"
                                placeholder="Short bio for user and this is optional"
                                class="form-control" 
                                :class="{ 'is-invalid': form.errors.has('type') }"
                            >
                            <option value="">Select User Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                            <option value="author">Author</option>
                            </select>
                            <has-error :form="form" field="type"></has-error>
                        </div>

                        <div class="form-group">
                            <input v-model="form.password" 
                                type="text" name="password"
                                id="password"
                                placeholder="********"
                                class="form-control" 
                                :class="{ 'is-invalid': form.errors.has('password') }"
                            >
                            <has-error :form="form" field="password"></has-error>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Create</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
   data (){
        return {
            users:{},
            
            ///create a new form new instance
            form: new Form ({
                name: '',
                email: '',
                password: '',
                type: '',
                bio: '',
                photo: ''
            })
        }
   },methods:{
        loadUsers(){
            axios.get("api/user").then(response => {
            // JSON responses are automatically parsed.
            this.users = response.data
            })
            .catch(e => {
            this.errors.push(e)
            })
        },

        createUser(){
             this.$Progress.start();
            this.form.post('api/user');
            $('#exampleModalCenter').modal('hide');
            toastr({
            type: 'success',
            title: 'User created successfully'
            })
            this.$Progress.finish();
            
        },
        
   },
   created(){
             this.loadUsers();
            //  setInterval(this.loadUsers,3000);
            // console.log (this.loadUsers);
        }
};
</script>
