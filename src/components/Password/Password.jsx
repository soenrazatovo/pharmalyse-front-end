import { useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// import { Eye, EyeOff } from "lucide-react";

function Password(props) {
  const [visible, setVisible] = useState(false);

  return (
    <TextField
      {...props}
      type={visible ? "text" : "password"}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setVisible(!visible)} edge="end">
                {visible ? <VisibilityOffIcon sx={{ fontSize: 27.5, color: "black" }} /> : <VisibilityIcon sx={{ fontSize: 27.5, color: "black" }} />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

export default Password;
