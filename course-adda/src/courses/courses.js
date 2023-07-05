import './courses.css'
import {  useEffect, useState } from "react";
function ListOfCourses(){
    const [data,setData]=useState([]);
    useEffect(()=>{
        handleCourseCollection();
    },[]);
    const handleCourseCollection=()=>{
        fetch("http://localhost:8080/admin/courses",{
            method:"GET",
            headers:{
                "Content-type":"application/json",
                Authorization:`Bearer ${localStorage.getItem("loginToken")}`
            },
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            setData(data.course);
        })
        .catch((error)=>{
            console.error(error);
        })
    };
    
    return(
        <>
        <div class="list">
            <h1 class="publishTitle">Published Courses</h1>
            <div class="courseData" >
            {data.map((course) => (
            <div key={course.id}>
                <div class="collectionUpdate">
                <h2>{course.title}</h2>
                <button class="updateButton">Update</button>
                </div>
              <p>description: {course.description}</p>
              <p>Price: {course.price}</p>
              <p>Image link: {course.imageLink}</p>
              <p>published: {course.published}</p>
            </div>
          ))}
            </div>
        </div>
        
        </>
    );
}
function Dashboard(){
    const[title,setTitle]=useState("");
    const[description,setDescription]=useState("");
    const[price,setPrice]=useState("");
    const[imageLink,setImageLink]=useState("");
    const[published,setPublished]=useState("");

    const handleCoursePublish=()=>{
        fetch("http://localhost:8080/admin/courses",{
            method:"POST",
            headers:{
                "Content-type":"application/json",
                Authorization:`Bearer ${localStorage.getItem("loginToken")}`
            },
            body:JSON.stringify({title,description,price,imageLink,published})
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
        })
        .catch((error)=>{
            console.error(error);
        });
    };

    const onChangeTitle=(event)=>{
        setTitle(event.target.value);
    }

    const onChangeDescription=(event)=>{
        setDescription(event.target.value);
    }
    const onChangePrice=(event)=>{
        setPrice(event.target.value);
    }
    const onChangeImageLink=(event)=>{
        setImageLink(event.target.value);
    }
    const onChangePublished=(event)=>{
        setPublished(event.target.value);
    }

    return(
        <>
        <div class="divider">
            <div class="meal">
            <h1 class="titleDashboard">Publish your courses!!!</h1>
                <div class="titleOfCourse">
                    <p>Title : </p>
                    <input type="text" name="title" class="titleInput" value={title} onChange={onChangeTitle}/>
                </div>
                <br></br>
                <div class="descriptionOfCourse">
                    <p>Description : </p>
                    <input type="text" name="description" class="descriptionInput" value={description} onChange={onChangeDescription}/>
                </div>
                <br></br>
                <div class="priceOfCourse">
                    <p>Price : </p>
                    <input type="Number" name="priceOfCourse"  class="priceOfCourseInput" value={price} onChange={onChangePrice}/>
                </div>
                <br></br>
                <div class="imageLinkOfCourse">
                    <p>Image Link : </p>
                    <input type="" name="imageLink" class="imageLinkInput" value={imageLink} onChange={onChangeImageLink}/>
                </div>
                <br></br>
                <div class="publishedOfCourse">
                    <p>Published : </p>
                    <input type="text" name="published" class="publishedInput" value={published} onChange={onChangePublished}/>
                </div>
                <button class="submitBtn" onClick={handleCoursePublish}>Submit</button>
            </div>
            <ListOfCourses/>
        </div>
        
        </>
    );
}

export default Dashboard;