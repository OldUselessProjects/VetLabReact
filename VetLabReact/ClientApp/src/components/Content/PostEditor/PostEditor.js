import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import s from "./PostEditor.module.css";
import Select from 'react-select'
import {RenderDom} from "../../../render";
import PostForm from "./PostForm";

class PostEditor extends Component {
    constructor(props) {
        super(props);
        //this.state = {post: { id:0,userId:0,themeId:0,title:"", content:"",date:"" }, form: null}
        this.state = {post: null, form: null, isLoading: true,fReturn :()=>{return this.state.post;}};
        this.LoadPost = this.LoadPost.bind(this);
        this.OnSubmit = this.OnSubmit.bind(this);
    }

    async LoadPost() {
        let postid = this.props.match.params.id;
        let request = await fetch("/api/posts/" + postid, {
            method: "GET",
            mode: "cors",
            credintials: "include"
        });
        if (request.ok) {
            var res = await request.json();
            this.state.post = res;
            this.setState({"isLoading": false});

            //this.state.post = res;
            // alert(request.json());
        }
    }

    async OnSubmit() {
        var rez = this.ReturnPost()
        //var rez = this.state.fReturn();
        var request = await fetch("/api/posts/"+rez.id,{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "contentPreview": rez.content,
                "content": rez.content,
                "title": rez.title,
                "themeId": rez.themeId,
                "userId": 1,
                "date": "2021-03-13T23:00:00",
                "id":rez.id
            })
        });
        window.location.assign('/');
    }

    ReturnPost() {
        return this.state.post;
    }

    componentDidMount() {
        this.LoadPost();
    }



    // async onSubmit(e) {
    //     e.preventDefault();
    //     let request = await fetch("/api/posts/", {
    //         method: "PUP",
    //         headers: {
    //             'Content-Type': 'application/json;charset=utf-8'
    //         },
    //         body: JSON.stringify({
    //             "contentPreview": this.state.content,
    //             "content": this.state.content,
    //             "title": this.state.title,
    //             "themeId": this.state.themeid,
    //             "userId": 1,
    //             "date": "2021-03-13T23:00:00"
    //         })
    //     });
    //     //window.location.assign("/");
    //     document.location = ('/');
    // }

    render() {
        var content = this.state.isLoading === true ? <p>????????????????</p> : <PostForm
            //ResponseMethod={this.SetPost}
            ResponseMethod={this.ReturnPost}
            post={this.state.post}/>;
        return (
            <div className={s.PEditor}>
                {content}
                <button onClick={this.OnSubmit}>??????????????</button>
            </div>
        )
    }
}

export default PostEditor