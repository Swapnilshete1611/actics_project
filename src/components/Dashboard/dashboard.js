import React from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../Dashboard/dashboard.css';
import usersData from "../../Static/users/signin.json";
import { CSVLink } from "react-csv";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,username: '',password: '',email:'',name: '',salary: 0,
            jsonData: JSON.parse(localStorage.getItem('JSONData')),
            // jsonData: usersData['usersData'],
            headers: [
                { label: "Emp ID", key: "id" },
                { label: "Name", key: "name" },
                { label: "Salary", key: "salary" },
                { label: "Email", key: "email" },
                { label: "UserName", key: "username" }
            ],
            currentPage: 1,
            perPage: 3
        };
    };

    handleLogout = (e) => {
        localStorage.setItem('token', '');
        localStorage.clear();      
        window.location.href = "/";
    };

    handleClick = (e) => {
        this.setState({ currentPage: Number(e.target.id) });
    };

    handleDeleteItem = (e, inputId) => {
        e.preventDefault();
        e.stopPropagation();
        var jsondataold = JSON.parse(localStorage.getItem('JSONData'));
        // var data = this.state.jsonData;
        var data = jsondataold;
        if (data.length > 1) {
            const result = data.find(({ id }) => id === inputId);
            const index = data.indexOf(result);
            if (index > -1) {
                data.splice(index, 1);                
            }
            this.setState({ jsonData: data });
            localStorage.setItem('JSONData',JSON.stringify(data));
        } else {
            alert('You are not able to delete last element');
        }
    };

    handleNameSort = (e) => {
       // var jsondataold = JSON.parse(localStorage.getItem('JSONData'));
       var data = this.state.jsonData.sort(this.GetSortOrder("name"));
       this.setState({jsonData: data});
    };

    handleSalarySort = (e) => {
        // var jsondataold = JSON.parse(localStorage.getItem('JSONData'));
        var data = this.state.jsonData.sort(this.GetSortOrder("salary"));
        this.setState({jsonData: data});
    };
    
    handleInputTypeChange = (e,type) => {
        var value = e.target.value;
        if(type === 'id'){
            this.setState({id: value});
        } else if(type ==='name'){
            this.setState({name: value});
        } else if(type ==='salary'){
            this.setState({salary: value});
        } else if(type ==='email'){
            this.setState({email: value});
        } else if(type ==='username'){
            this.setState({username: value});
        } else if(type ==='password'){
            this.setState({password: value});
        }
      
    };

    createNewItem() {
        // push into that jsondata
        var newUser = {
          "id":this.state.id,
          "username": this.state.username,
          "password": this.state.password,
          "email": this.state.email,
          "token": this.state.username +'~'+ this.state.email,
          "name": this.state.name,
          "salary": parseInt(this.state.salary),
        }
        // var jsondataold = JSON.parse(localStorage.getItem('JSONData'));
        var data = this.state.jsonData;
        data.push(newUser);
        this.setState({jsonData: data});
        localStorage.setItem('JSONData',JSON.stringify(data));
        console.log(data);
      };    

    handleAddItem = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (this.state.username !== '' && this.state.email !== '' && this.state.password !== '' && this.state.id !== '' && this.state.name !== '' && this.state.salary !== ''  && this.state.salary > 0) {
          const result = this.state.jsonData.find(({ username,id,name, email }) => username === this.state.username || id===this.state.id || name===this.state.name|| email===this.state.email);
          if(result){
            alert('UserName already present please choose new another username'); 
          } else {     
            this.createNewItem();
            alert('New Item added succefully and redirect to dashboard');   
            window.location.href = "/";
          }   
        }
        else if (this.state.username === '' || this.state.username === null) {
          alert('Please enter username');
        }
        else if (this.state.email === '' || this.state.email === null) {
          alert('Please enter email');
        }
        else if (this.state.password === '' || this.state.password === null) {
          alert('Please enter password');
        }
        else if (this.state.id === '' || this.state.id === null) {
            alert('Please enter emp id');
        }
        else if (this.state.name === '' || this.state.name === null) {
            alert('Please enter name');
        }
        else if (this.state.salary === '' || this.state.salary === null) {
            alert('Please enter salary');
        }

      };

    handleNameSearch = (e) => {
        var jsondataold = JSON.parse(localStorage.getItem('JSONData'));
        var data = jsondataold;
        if (e.target.value) {
            // find all strings in array containing 'thi' e.target.value
            const matchesData = data.filter(s => s.name.includes(e.target.value));
            this.setState({ jsonData: matchesData });
        } else {
            this.setState({ jsonData: data });
        }
    };
  
    //Comparer Function    
    GetSortOrder(prop) {
        return function (a, b) {
            if (a[prop] > b[prop]) {
                return 1;
            } else if (a[prop] < b[prop]) {
                return -1;
            }
            return 0;
        }
    };

    render() {
        const { jsonData, currentPage, perPage, headers } = this.state;

        // Logic for displaying jsonData
        const indexOfLastTodo = currentPage * perPage;
        const indexOfFirstTodo = indexOfLastTodo - perPage;
        const currentData = jsonData && jsonData.slice(indexOfFirstTodo, indexOfLastTodo);
        const renderJSonData = currentData && currentData.map((data, index) => {
            return <tr key={'_row' + index}>
                <td key={'_id' + index}>{data.id}</td>
                <td key={'_name' + index}>{data.name}</td>
                <td key={'_salary' + index}>{data.salary}</td>
                <td key={'_email' + index}>{data.email}</td>
                <td key={'_username' + index}>{data.username}</td>
                <td key={'_action' + index} style={{ textAlign: 'center' }}><button type="button" style={{ borderRadius: '5px' }} onClick={(e) => this.handleDeleteItem(e, data.id)} > Delete </button></td>
            </tr>;
        });

        // Logic for displaying page numbers
        const pageNumbers = [];
        const length = jsonData && jsonData.length;
        for (let i = 1; i <= Math.ceil(length / perPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <a href="#" key={number} id={number} onClick={this.handleClick} style={{ padding: '1%', border: '1px solid #d3d3d3', borderRadius: '5px' }}>
                    {number}
                </a>
            );
        });

        return (
            <div>           

                


                <div className="topnav">
                    <a className="active" href="#Dashboard">Dashboard</a>
                    <div className="login-container">
                        {/* <button type="button" style={{ padding: '10px' }}> <b>Add New Item</b> </button> */}
                    </div>
                </div>

                <div className='parent'>
                    <div className='child' style={{ paddingTop: '0px', paddingLeft: '0px' }}>
                        <div>
                            <div id="table">
                                <div style={{ marginBottom: '1%' }}>



                                    <Popup trigger={<button type="button" style={{ padding: '10px', float: 'left' }}> <b>Add New Item</b> </button>
                                    } position="right center">
                                        <div>
                                            <div className="form">
                                            <div className="form-group">
                                                    <label htmlFor="empid">Emp ID</label>
                                                    <input type="text" name="empid" placeholder="Emp Id" onChange={(e) => this.handleInputTypeChange(e, 'id')}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="name">Name</label>
                                                    <input type="text" name="name" placeholder="Name" onChange={(e) => this.handleInputTypeChange(e, 'name')}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="salary">Salary</label>
                                                    <input type="text" name="salary" placeholder="Salary" onChange={(e) => this.handleInputTypeChange(e, 'salary')}/>
                                                </div>                                               
                                                <div className="form-group">
                                                    <label htmlFor="email">Email</label>
                                                    <input type="email" name="email" placeholder="email" onChange={(e) => this.handleInputTypeChange(e, 'email')}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="username">Username</label>
                                                    <input type="text" name="username" placeholder="username" onChange={(e) => this.handleInputTypeChange(e, 'username')}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="password">Password</label>
                                                    <input type="password" name="password" placeholder="password" onChange={(e) => this.handleInputTypeChange(e, 'password')}/>
                                                </div>
                                                <button type="button" className="btn" style={{ marginTop: '5%' }} onClick={this.handleAddItem} >
                                                    Add Item
                                                </button>
                                            </div>
                                        </div>
                                    </Popup>

                                   
                                    
                                    <button type="button" style={{ padding: '10px', float: 'right', marginBottom: '1%' }} onClick={this.handleLogout}> <b>Logout</b> </button>
                                </div>
                                <table>
                                    <tbody>
                                        <tr key="_keyTh1">
                                            <th style={{ width: '100px' }}>Emp ID</th>
                                            <th style={{ width: '100px' }}>Name</th>
                                            <th style={{ width: '100px' }}>Salary</th>
                                            <th style={{ width: '100px' }}>Email Address</th>
                                            <th style={{ width: '100px' }}>UserName</th>
                                            <th style={{ width: '100px', textAlign: 'center' }}>Action</th>
                                        </tr>
                                        {renderJSonData}
                                    </tbody>
                                </table>
                                <CSVLink data={jsonData} headers={headers} style={{ marginTop: '3%', float: 'left', marginBottom: '1%' }}>
                                    Download CSV File
                                </CSVLink>
                            </div>
                            <div id="page-numbers" className="pagination" style={{ marginTop: '3%', textAlign: 'right', }}>
                                {renderPageNumbers}
                            </div>
                        </div>
                    </div>

                    <div className='child' style={{ border: '1px solid #d3d3d3', paddingTop: '0px' }}>
                        <div style={{ textAlign: 'left' }}>
                            <b>Search by Name</b><br />
                            <input type="text" name="name" placeholder="name" style={{ borderRadius: '5px', padding: '2%' }} onChange={this.handleNameSearch} />
                            <br />
                        </div>
                        <div style={{ textAlign: 'left' }}><br />
                            <b>Sort By</b>
                        </div>
                        <div>
                            <ul style={{ margin: '0px', padding: '0px', listStyleType: 'none' }}>
                                <li>
                                    <input type="radio" name="sort" onClick={this.handleNameSort}/>Name
                                </li>
                                <li>
                                    <input type="radio" name="sort" onClick={this.handleSalarySort}/>Salary
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>

            </div>           
        );
    }
}

