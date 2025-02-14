import { Button, NumberInput, TagsInput, Textarea } from "@mantine/core";
import SelectInput from "./SelectInput"
import TextEditor from "./TextEditor";
import { content, fields } from "../../assets/Data/PostJob";
import { isNotEmpty, useForm } from "@mantine/form";
import { getJob, postJob } from "../../Services/JobService";
import { errorNotification, successNotification } from "../../Services/NotificationService";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const PostJobs = () => {
    const {id}=useParams();
    const [editorData, setEditorData] = useState(content);
    const user =useSelector((state:any)=>state.user)
    const select=fields;
    const navigate=useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0)
        if(id!=="0"){
            getJob(id).then((res)=>{
                form.setValues(res);
                setEditorData(res.description);
            }).catch((error)=>{
                console.log(error);
            })
        }
        else{
            form.reset();//function of mantine form to reset the form
            setEditorData(content);
        }
    }, [])
    const form=useForm({
        mode:'controlled',
        validateInputOnChange:true,
        initialValues:{
            jobTitle:'',
            company:'',
            experience:'',
            jobType:'',
            location:'',
            packageOffered:'',
            skillsRequired:[],
            about:'',
            description:content
        },
        validate:{
            jobTitle: isNotEmpty('Job Title is required'),
            company: isNotEmpty('Company is required'),
            experience: isNotEmpty('Experience is required'),
            jobType: isNotEmpty('Job Type is required'),
            location: isNotEmpty('Location is required'),
            packageOffered: isNotEmpty('Package Offered is required'),
            skillsRequired: isNotEmpty('Skills are required'),
            about: isNotEmpty('About is required'),
            description: isNotEmpty('Description is required')
        }

    });
    const handlePost=()=>{
        form.validate();
        if(!form.isValid()) 
            return;
            postJob({...form.getValues(),id,postedBy:user.id, jobStatus:"ACTIVE"}).then((res)=>{
                successNotification('Job Posted Successfully', 'success');
                 navigate(`/posted-job/${res.id}`);
            }).catch((error)=>{
                console.log(error);
               errorNotification(error.response.data.errorMessage, 'error');
            })
        }
        const handleDraft=()=>{
                postJob({...form.getValues(),id,postedBy:user.id, jobStatus:"DRAFT"}).then((res)=>{
                    successNotification('Job Drafted Successfully', 'success');
                    navigate(`/posted-job/${res.id}`);
                }).catch((error)=>{
                    console.log(error);
                   errorNotification(error.response.data.errorMessage, 'error');
                })
            }
  return ( <div className="w-4/5 md-mx:w-[92%] mx-auto">
    <div className="text-2xl font-semibold mt-4 mb-5">PostJobs</div>
    <div className="flex flex-col gap-5">
        <div className="flex gap-10 md-mx:gap-5 [&>*]:w-1/2 sm-mx:[&>*]:w-full sm-mx:flex-wrap">
            <SelectInput form={form} name="jobTitle" {...select[0]}/>
            <SelectInput form={form} name="company" {...select[1]}/>
        </div>
        <div className="flex gap-10 md-mx:gap-5 [&>*]:w-1/2 ">
            <SelectInput form={form} name="experience" {...select[2]}/>
            <SelectInput form={form} name="jobType" {...select[3]}/>
        </div>
        <div className="flex gap-10 md-mx:gap-5 [&>*]:w-1/2 sm-mx:[&>*]:w-full sm-mx:flex-wrap">
            <SelectInput form={form} name="location" {...select[4]}/>
            <NumberInput {...form.getInputProps('packageOffered')} withAsterisk label="packageOffered" min={1} max={500} clampBehavior="strict" placeholder="Enter Salary" hideControls/>
        </div>
        <TagsInput {...form.getInputProps('skillsRequired')} withAsterisk label="Skills" placeholder="Enter the skills" splitChars={[',', ' ', '|']} clearable acceptValueOnBlur />
        <Textarea {...form.getInputProps('about')} withAsterisk label="About" placeholder="Enter the about" minRows={3} maxRows={6} />
        <div className="[&_button[data-active='true']]:!text-blue-400 [&_button[data-active='true']]:!bg-blue-400/20">
            <div className="text-sm font-medium">Job Description <span className="text-red-500">*</span> </div>
            <TextEditor form={form} data={editorData}/>
        </div>
    <div className="flex gap-4">
    <Button color="blue.4" variant='light' onClick={handlePost} >Publish</Button> 
    <Button color="blue.4" variant='outline' onClick={handleDraft} >Save as Draft</Button> 
    </div>
    </div>
    </div>
  )
}

export default PostJobs