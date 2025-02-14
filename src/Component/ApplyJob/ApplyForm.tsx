import { Button, FileInput, LoadingOverlay, NumberInput, Textarea, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconPaperclip } from "@tabler/icons-react";
import { useState } from "react";
import { getBase64 } from "../../Services/Utilities";
import { applyJob } from "../../Services/JobService";
import { useNavigate, useParams } from "react-router-dom";
import { errorNotification, successNotification } from "../../Services/NotificationService";
import { useSelector } from "react-redux";

interface ApplyFormValues {
    name: string;
    email: string;
    phone: string;
    website: string;
    resume: File | null;
    coverLetter: string;
}

const ApplyForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const user = useSelector((state: any) => state.user);
    const [preview, setPreview] = useState(false);
    const [submit, setSubmit] = useState(false);

    const handlePreview = () => {
        form.validate();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (!form.isValid()) return;
        setPreview(!preview);
    };

    const handleSubmit = async () => {
        setSubmit(true);
        try {
            const { resume } = form.getValues();

            if (!resume) {
                throw new Error("Resume is required");
            }
            if (resume instanceof File && resume.size > 15 * 1024 * 1024) { // Check file size (15MB)
                throw new Error("Resume file size should be under 15MB.");
            }

            let resumeBase64: any = await getBase64(resume);
            let applicant = { ...form.getValues(), applicantId: user.id, resume: resumeBase64.split(',')[1] };
            const res = await applyJob(id, applicant);

            if (res.error) throw new Error(res.error);

            setSubmit(false);
            successNotification("Application Submitted Successfully", "Success");
            navigate(-1);  // Change to job history page later
        } catch (err: any) {
            setSubmit(false);
            errorNotification(err.response.data.errorMessage || "Failed to submit application", "Error");
        }
    };

    const form = useForm<ApplyFormValues>({
        mode: 'controlled',
        validateInputOnChange: true,
        initialValues: { name: '', email: '', phone: '', website: '', resume: null, coverLetter: '' },
        validate: {
            name: isNotEmpty('This field is required'),
            email: (value) => /^\S+@\S+\.\S+$/.test(value) ? null : 'Invalid email address',
            phone: (value) => /^\d{10}$/.test(value) ? null : 'Phone number must be 10 digits',
            website: (value) => value && !/^https?:\/\/\S+$/.test(value) ? 'Invalid URL' : null,
            resume: isNotEmpty('Resume is required'),
        }
    });

    return (
        <div>
            <LoadingOverlay visible={submit} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <div className="text-xl font-semibold mb-5">Submit Your Application</div>
            <div className="flex flex-col gap-5">
                <div className="flex gap-10 [&>*]:w-1/2 sm-mx:[&>*]:w-full sm-mx:flex-wrap sm-mx:gap-5">
                    <TextInput {...form.getInputProps("name")} readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-cape-cod-300 font-semibold" : ""}`} label="Full Name" withAsterisk description="Enter Name" />
                    <TextInput {...form.getInputProps("email")} readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-cape-cod-300 font-semibold" : ""}`} label="Email" withAsterisk description="Enter Email" />
                </div>
                <div className="flex gap-10 [&>*]:w-1/2">
                    <NumberInput {...form.getInputProps("phone")} readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-cape-cod-300 font-semibold" : ""}`} label="Phone Number" withAsterisk description="Enter Phone Number" hideControls min={0} max={9999999999} clampBehavior="strict" />
                    <TextInput {...form.getInputProps("website")} readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-cape-cod-300 font-semibold" : ""}`} label="Personal Website" withAsterisk description="Enter Url" />
                </div>
                <FileInput {...form.getInputProps("resume")} accept="application/pdf" readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-cape-cod-300 font-semibold" : ""}`} leftSection={<IconPaperclip stroke={1.5} />} label="Attach your CV" placeholder="Your CV" withAsterisk leftSectionPointerEvents="none" />
                <Textarea {...form.getInputProps("coverLetter")} readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-cape-cod-300 font-semibold" : ""}`} placeholder="Write your cover letter..." label="Cover Letter" withAsterisk autosize minRows={4} />
                {!preview && <Button onClick={handlePreview} color="blue.4" variant="light">Preview</Button>}
                {
                    preview && <div className="flex gap-10 [&>*]:w-1/2">
                        <Button onClick={handlePreview} color="blue.4" variant="light">Edit</Button>
                        <Button onClick={handleSubmit} color="blue.4" variant="light">Submit</Button>
                    </div>
                }
            </div>
        </div>
    );
};

export default ApplyForm;






//================================old code in case if needed========================================//

// import { Button, FileInput, LoadingOverlay, NumberInput, Textarea, TextInput } from "@mantine/core"
// import { isNotEmpty, useForm } from "@mantine/form";
// import { IconPaperclip } from "@tabler/icons-react";
// import { useState } from "react";
// import { getBase64 } from "../../Services/Utilities";
// import { applyJob } from "../../Services/JobService";
// import { useNavigate, useParams } from "react-router-dom";
// import { errorNotification, successNotification } from "../../Services/NotificationService";
// import { useSelector } from "react-redux";

// const ApplyForm = () => {
//     const navigate = useNavigate();
//     const { id } = useParams();
//     const user = useSelector((state: any) => state.user);
//     const [preview, setPreview] = useState(false);
//     const [submit, setSubmit] = useState(false);
//     const handlePreview = () => {
//         form.validate()
//         window.scrollTo({ top: 0, behavior: 'smooth' })
//         if (!form.isValid()) return
//         setPreview(!preview)
//     }
//     const handleSubmit = async () => {
//         setSubmit(true);
//         try {
//             let resume: any = await getBase64(form.getValues().resume);
//             let applicant = { ...form.getValues(), applicantId: user.id, resume: resume.split(',')[1] };
//             const res = await applyJob(id, applicant);
//             if (res.error) throw new Error(res.error);
//             setSubmit(false);
//             successNotification("Application Submitted Successfully", "Success");
//             navigate(-1);// need to change later to job history page
//         } catch (err: any) {
//             setSubmit(false);
//             errorNotification(err.response.data.errorMessage || "Failed to submit application", "Error");
//         }
//     };

//     const form = useForm({
//         mode: 'controlled',
//         validateInputOnChange: true,
//         initialValues: { name: '', email: '', phone: '', website: '', resume: null, coverLetter: '' },
//         validate: {
//             name: isNotEmpty('This field is required'),
//             email: isNotEmpty('This field is required'),
//             phone: isNotEmpty('This field is required'),
//             website: isNotEmpty('This field is required'),
//             resume: isNotEmpty('Resume is required')
//         }
//     });
//     return (
//         <div>
//             <LoadingOverlay visible={submit} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
//             <div className="text-xl font-semibold mb-5"> Submit Your Application</div>
//             <div className="flex flex-col gap-5">
//                 <div className="flex gap-10 [&>*]:w-1/2">
//                     <TextInput {...form.getInputProps("name")} readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-cape-cod-300 font-semibold" : ""}`} label="Full Name" withAsterisk description="Enter Name" />
//                     <TextInput {...form.getInputProps("email")} readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-cape-cod-300 font-semibold" : ""}`} label="Email" withAsterisk description="Enter Email" />
//                 </div>
//                 <div className="flex gap-10 [&>*]:w-1/2">
//                     <NumberInput {...form.getInputProps("phone")} readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-cape-cod-300 font-semibold" : ""}`} label="Phone Number" withAsterisk description="Enter Phone Number" hideControls min={0} max={9999999999} clampBehavior="strict" />
//                     <TextInput {...form.getInputProps("website")} readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-cape-cod-300 font-semibold" : ""}`} label="Personal Website" withAsterisk description="Enter Url" />
//                 </div>
//                 <FileInput {...form.getInputProps("resume")} accept="application/pdf" readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-cape-cod-300 font-semibold" : ""}`} leftSection={<IconPaperclip stroke={1.5} />} label="Attach your CV" placeholder="Your CV" withAsterisk leftSectionPointerEvents="none" />
//                 <Textarea {...form.getInputProps("coverLetter")} readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-cape-cod-300 font-semibold" : ""}`} placeholder="Write your cover letter..." label="Cover Letter" withAsterisk autosize minRows={4} />
//                 {!preview && <Button onClick={handlePreview} color="blue.4" variant="light">Preview</Button>}
//                 {
//                     preview && <div className="flex gap-10 [&>*]:w-1/2">
//                         <Button onClick={handlePreview} color="blue.4" variant="light">Edit</Button>
//                         <Button onClick={handleSubmit} color="blue.4" variant="light">Submit</Button>
//                     </div>
//                 }
//             </div>
//         </div>
//     )
// }

// export default ApplyForm