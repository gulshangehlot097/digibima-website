import { AiOutlineInfoCircle } from "react-icons/ai";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import CustomTooltip from "./CustomTooltip";

const UniversalDatePicker = ({
    id,
    name,
    label,
    value,
    onChange,
    // placeholder = '',
    // tooltipContent = '',
    // tooltipPlacement = 'top',
    // error = false,
    errorText = '',
    minDate,
    maxDate,
    defaultValue,
    views
}) => {
    return (
        <div className=''>
            <LocalizationProvider dateAdapter={AdapterDateFns} className="h-5 bg-slate-500" >
              
                <DatePicker
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    views={views}
                    defaultValue={defaultValue || null}
                    format="dd-MM-yyyy"
                    slotProps={{
                       textField: {
              fullWidth: true,
              variant: "outlined",
              className: "inputcls", 
              InputProps: {
                 disableUnderline: true,
                style: {
                  backgroundColor: "#fff",
                  fontSize: "0.875rem", // match your inputcls
                  height: "42px",       // optional
                  
                  padding: "0.75rem 1rem",
                  borderRadius: "9999px",
                },
                
              },
              InputLabelProps: {
                shrink: true,
                
              },
            },
                    }}
                />
            </LocalizationProvider>
        </div>
    );
};

export default UniversalDatePicker;
