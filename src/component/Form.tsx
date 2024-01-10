import {useForm, useFieldArray} from "react-hook-form";
import "./style.css";

// Define the type for form values
type FormValues={
    first_name:string;
    last_name:string;
    gender:string;
    dob:Date;
    email:string;
    phoneNumber:string;
    project:{
        projectName:string,
        projectDetails:string,
    }[];
    course:string;
}

// Form component
export default function Form() {
    
      // Initialize the form with default values
    const form = useForm<FormValues>({

        defaultValues:{
            first_name:"",
            last_name:"",
            gender:"",
            dob:new Date(),
            email:"",
            phoneNumber:"",
            project:[{
                projectName:"",
                projectDetails:""
            }],
            course:"",
        }
    });

    // Destructure form properties
    const {register,control,handleSubmit,formState,reset,watch}=form;
    
     // Destructure formState properties
    const {errors,isSubmitSuccessful}=formState;

      // Destructure useFieldArray methods
    const {fields,append,remove}=useFieldArray({
        name:'project',
        control
    })

    // Handle form submission
    const onSubmit=(data:FormValues)=>{
        console.log(data);
    }

    // Flag and variables for phone number validation
    let flag:number;
    flag=0;
    let phone_number:string;
    let arrPhone:string[];

  return (
    <>
        <div>
            {/* Title */}
            <h1 style={{color:"white"}}>Sign up</h1>
        </div>


        <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Form fields */}

            <div>
                {/* First Name */}
                <label htmlFor="first_name">First Name</label>
                <input type="text" {...register("first_name",{required:{value:true,message:"First name is required"}})} />
                <p>{errors.first_name?.message}</p>
            </div>


            <div>
                {/* last name */}
            <label htmlFor="last_name">Last Name</label>
            <input type="text" {...register("last_name",{required:{value:true,message:"Last name is required"}})} />
            <p>{errors.last_name?.message}</p>
            </div>


            <div>
                {/* gender */}
            <label htmlFor="gender">Gender</label>
            <div className="gender">
            <input type="radio" value={"male"} {...register("gender",{required:{value:true,message:"Gender is required"}})} /><label>Male</label>
            <input type="radio" value={"female"} {...register("gender",{required:{value:true,message:"Gender is required"}})} /><label>Female</label>
            <input type="radio" value={"other"} {...register("gender",{required:{value:true,message:"Gender is required"}})} /><label>Other</label>
            </div>
            <p>{errors.gender?.message}</p>
            </div>


            <div>
                {/* date of birth */}
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" {...register("dob",{required:{value:true,message:"Date of Birth is required"},valueAsDate:true})} />
            <p>{errors.dob?.message}</p>
            </div>


            <div>
                {/* email */}
            <label htmlFor="email">Email</label>
            <input type="email" {...register("email",{pattern:{value:/^([a-zA-Z0-9_\-/.]+)@([a-zA-Z0-9_/-]+)(\.[a-zA-Z]{2,5}){1,2}$/,message:"Invalid Email format"},validate:(fieldValue)=>{return (fieldValue!==""||"Email is required")}})} />
            <p>{errors.email?.message}</p>
            </div>


            <div>
                {/* phone number */}
            <label htmlFor="phoneNumber">Phone Number</label>
            <input type="text" {...register("phoneNumber",{required:{value:true,message:"Phone number is required"},validate:(fieldValue)=>{
                phone_number=fieldValue;
                arrPhone=phone_number.split('');
                arrPhone.map((e,id)=>{
                    
                    if ((fieldValue.charCodeAt(id)<48||fieldValue.charCodeAt(id)>57))
                    {
                        flag=1;
                    }
                })
                if (flag==1)
                {
                    flag=0;
                    return "Phone number contain digits only";
                }
                else{
                    return (fieldValue.length===10||"Phone number should be 10 digits");
                }
                
                }})} />
            <p>{errors.phoneNumber?.message}</p>
            </div>


            <div>
                {/* courses */}
            <label>Course </label>
                <select {...register('course',{required:{value:true,message:"Course is required"}})} >
                    <option value={""}>Select Course</option>
                    <option value={"B.Tech"}>B.Tech</option>
                    <option value={"BCA"}>BCA</option>
                    <option value={"MCA"}>MCA</option>
                    <option value={"Other"}>Other</option>
                </select>
            <p>{errors.course?.message}</p>
            </div>


            <div>
                {/* project */}
            <label htmlFor="project">Project</label>
            <div className="outer_Project">
                {
                    fields.map((field,index)=>{

                        return index>0 &&(
                            <div key={field.id} className="project">
                                <input type="text" placeholder="Project Title" {...register(`project.${index}.projectName` as const,{required:{value:true,message:"Project Name is required"}}) } />
                                <p>{errors.project?.[index]?.projectName?.message}</p>
                                <textarea placeholder="Project Description" rows={5} {...register(`project.${index}.projectDetails` as const,{required:{value:true,message:"Project Description is required"}})} />
                                <p>{errors.project?.[index]?.projectDetails?.message}</p>
                                {
                                        index>0 && (
                                            <button type="button" onClick={()=>remove(index)}>Remove</button>
                                        )
                                }
                            </div>
                        )
                       
                    })
                }
                <button type="button" onClick={()=>append({projectName:"",projectDetails:""})}>Add Project</button>
            </div>
            </div>

                    {/* Submit and Reset buttons */}
            <div>
                <button >Submit</button>
            </div>

            <div>
                <button type="button" onClick={()=> reset()}>Reset</button>
            </div>
            

        </form>

                {/* Display user details if submission is successful */}
        <div >
        {
            isSubmitSuccessful && (
                
                <div className="user_details">
                    {/* Display project details */}

                    <h1>First Name</h1>
                    <h4>{ watch("first_name")}</h4>

                    <h1>Last Name</h1>
                    <h4>{watch("last_name")}</h4>

                    <h1>Gender</h1>
                    <h4>{watch("gender")}</h4>

                    <h1>Email</h1>
                    <h4>{watch("email")}</h4>

                    <h1>Phone Number</h1>
                    <h4>{watch("phoneNumber")}</h4>

                    <h1>Course</h1>
                    <h4>{watch("course")}</h4>

                    <h1>Project</h1>
                    {
                        fields.map((e,ind)=>{
                            const project=watch("project");
                            return (
                                <div key={e.id}>
                                    
                                    {project?.[ind]?.projectName}
                                </div>
                            )
                        })
                    }

                </div>
            )
        }
        </div>
    </>
  )
}
