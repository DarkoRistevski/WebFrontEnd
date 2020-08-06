import React, {Component} from "react";

class DeleteRecipe extends Component {

    render() {

        return (

            <div className="card">
                <div className="card-header text-center deleteHeader text-uppercase" style={{
                    backgroundColor: "#f7cac9",
                    color: "#c94c4c"
                }}>
                    <b>Confirm removal</b>
                </div>
                <div className="card-body text-center">
                    <p className="card-text">Are you sure you want to delete
                        <b> {this.props.title}</b>?</p>
                </div>
                <div className="card-footer" style={{backgroundColor: "white"}}>
                    <div className="row">
                        <div className="col">

                            <button onClick={this.props.hide}
                                    className="btn btn-success w-100">
                                <i className="fa fa-times"/> Cancel
                            </button>
                        </div>

                        <div className="col">
                            <button onClick={this.props.delete}
                                    className="btn btn-danger w-100">
                                <i className="fa fa-trash"/> Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        )

    }

}

export default DeleteRecipe;