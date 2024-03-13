import jobs from '../../../Assets/Images/Jobs.svg'
import successJobs from '../../../Assets/Images/Success jobs.svg'
import failedJobs from '../../../Assets/Images/Failed jobs.svg'


const dashboardOptions = [
    {
        icon:jobs,
        name: "Number of Jobs",
        color: "#E8DEFF",
        number: "jobs"
    },
    {
        icon: successJobs,
        name: "Succeeded Jobs",
        color: "#EDFFED",
        number: "successJobs"
    },
    {
        icon: failedJobs,
        name: "Failed Jobs",
        color: "#FFE5E5",
        number: "failedJobs"
    },
]

export default dashboardOptions