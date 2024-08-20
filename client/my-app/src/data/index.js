export const resumeForm = [
  {
    name: "firstName",
    lable: "First Name *",
    placeholder: "Enter First Name",
    type: "text",
    rules: {
      required: "First Name is required",
      pattern: {
        message: "Enter a valid name",
      },
    },
  },
  {
    name: "lastName",
    lable: "Last Name *",
    placeholder: "Enter Last Name",
    type: "text",
    rules: {
      required: "Last Name is required",
      pattern: {
        message: "Enter a valid name",
      },
    },
  },
  {
    name: "designation",
    lable: "Designation *",
    placeholder: "Enter Designation",
    type: "text",
    rules: {
      required: "Designation is required",
      pattern: {
        message: "Enter a valid designation",
      },
    },
  },
  {
    name: "mobileNumber",
    lable: "Mobile Number *",
    placeholder: "Enter Mobile Number",
    type: "tel",
    rules: {
      required: "Mobile Number is required",
      pattern: {
        message: "Enter a valid mobile number",
      },
    },
  },
  {
    name: "email",
    lable: "Email *",
    placeholder: "Enter email",
    type: "text",
    rules: {
      required: "Email is required",
      pattern: {
        message: "Enter a valid email",
      },
    },
  },
  {
    name: "location",
    lable: "Current Location *",
    placeholder: "Enter Location",
    type: "text",
    rules: {
      required: "location is required",
      pattern: {
        message: "Enter a valid location",
      },
    },
  },
  {
    name: "description",
    lable: "About Me *",
    placeholder: "About me",
    type: "textarea",
    rules: {
      required: "description is required",
      pattern: {
        message: "Enter a valid description",
      },
    },
  },
];
export const experienceForm = [
  {
    name: "experienceDesignation",
    lable: "Designation *",
    placeholder: "Enter Designation",
    type: "text",
    rules: {
      required: "Designation is required",
      pattern: {
        message: "Enter a valid designation",
      },
    },
  },
  {
    name: "organization",
    lable: "Organization *",
    placeholder: "Enter company name",
    type: "text",
  },
  {
    name: "experienceLocation",
    lable: "Current Location *",
    placeholder: "Enter Location",
    type: "text",
    rules: {
      required: "location is required",
      pattern: {
        message: "Enter a valid location",
      },
    },
  },
  {
    name: "workDescription",
    lable: "Work Description *",
    placeholder: "Describe your work",
    type: "textarea",
    rules: {
      required: "location is required",
      pattern: {
        message: "Enter a valid location",
      },
    },
  },
];
export const educationForm = [
  {
    name: "courseName",
    lable: "Course Name *",
    placeholder: "Enter Course Name",
    type: "text",
    // rules: {
    //   required: "Designation is required",
    //   pattern: {
    //     message: "Enter a valid designation",
    //   },
    // },
  },
  {
    name: "board",
    lable: "Specialization / Board *",
    placeholder: "Enter specialization / Board",
    type: "text",
  },
  {
    name: "uniName",
    lable: "University Name *",
    placeholder: "Enter university name",
    type: "text",
    // rules: {
    //   required: "location is required",
    //   pattern: {
    //     message: "Enter a valid location",
    //   },
    // },
  },
  // {
  //   name: "workDescription",
  //   lable: "Work Description *",
  //   placeholder: "Describe your work",
  //   type: "textarea",
  //   rules: {
  //     required: "location is required",
  //     pattern: {
  //       message: "Enter a valid location",
  //     },
  //   },
  // },
];
export const jobApplyData = [
  {
    name: "firstName",
    label: "First Name",
    placeholder: "Enter first name",
    type: "text",
    rules: {
      required: "First name is required",
      pattern: {
        value: /^[A-Za-z]+$/,
        message: "Enter a valid first name",
      },
    },
  },
  {
    name: "lastName",
    label: "Last Name",
    placeholder: "Enter last name",
    type: "text",
    rules: {
      required: "Last name is required",
      pattern: {
        value: /^[A-Za-z]+$/,
        message: "Enter a valid last name",
      },
    },
  },
  {
    name: "phoneNumber",
    label: "Phone Number *",
    placeholder: "Enter Phone Number",
    type: "number",
    rules: {
      required: "Phone Number is required",
      pattern: {
        message: "Enter a valid mobile number",
      },
    },
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter email address",
    type: "text",
    rules: {
      required: "email address is required",
      pattern: {
        // value: /^[A-Za-z]+$/,
        message: "Enter a valid last name",
      },
    },
  },
  {
    name: "currentCompany",
    label: "Current Company",
    placeholder: "Enter current company",
    type: "text",
    rules: {
      required: " required",
      pattern: {
        // value: /^[A-Za-z]+$/,
        message: "Enter a valid last name",
      },
    },
  },
  {
    name: "address",
    label: "Address",
    placeholder: "Enter address",
    type: "text",
    rules: {
      required: " required",
      pattern: {
        // value: /^[A-Za-z]+$/,
        message: "Enter a valid last name",
      },
    },
  },
];
export const jobPost = [
  {
    name: "title",
    lable: "Title *",
    placeholder: "Enter a title",
    type: "text",
    rules: {
      required: "Title is required",
      pattern: {
        message: "Enter a valid location",
      },
    },
  },
  {
    name: "company",
    lable: "Company *",
    placeholder: "Enter company  name",
    type: "text",
    rules: {
      required: "Company is required",
      pattern: {
        message: "Enter a valid location",
      },
    },
  },
  {
    name: "location",
    lable: "Location *",
    placeholder: "Enter Location",
    type: "text",
    rules: {
      required: "location is required",
      pattern: {
        message: "Enter a valid location",
      },
    },
  },
  {
    name: "salary",
    lable: "Salary *",
    placeholder: "Enter salary",
    type: "text",
    rules: {
      required: "salary is required",
      pattern: {
        message: "Enter a valid location",
      },
    },
  },
];
