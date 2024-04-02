import tableau from '../../Assets/Images/Tableau.png'
import tableauPrep from '../../Assets/Images/Tableau Prep.webp'
import powerBI from '../../Assets/Images/powerBI.png'
import ibm from '../../Assets/Images/IBM Datastage.png'
import informatica from '../../Assets/Images/Informatica Powercenter.png'
import glue from '../../Assets/Images/Glue.png'
import metabase from '../../Assets/Images/Matabase.png'

const toolsList = [
    {
        id: 1,
        from: tableau,
        to: powerBI,
        name: "Tableau to Power BI",
        description: "Use Tableau to Power BI tool to initiate migration."
    },
    {
        id: 2,
        from: tableauPrep,
        to: powerBI,
        name: "Tableau Prep to Power BI",
        description: "Use Tableau Prep to Power BI tool to initiate migration."
    },
    {
        id: 3,
        from: tableau,
        to: metabase,
        name: "Tableau to Metabase",
        description: "Use Tableau to Metabase tool to initiate migration."
    },
    {
        id: 4,
        from: ibm,
        to: glue,
        name: "IBM Datastage to Glue",
        description: "Use IBM Datastage to Glue tool to initiate migration."
    },
    {
        id: 5,
        from: ibm,
        to: informatica,
        name: "IBM Datastage to Informatica Powercenter",
        description: "Use IBM Datastage to Informatica Powercenter tool to initiate migration."
    },
    
]

export default toolsList