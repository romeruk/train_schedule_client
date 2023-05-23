import { Edit } from "@refinedev/mui";
import { Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";

export const RouteEdit = () => {
  const {
    saveButtonProps,
    refineCore: { queryResult },
    register,
    formState: { errors },
  } = useForm();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("route_title", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.route_title}
          helperText={(errors as any)?.route_title?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="route Title"
          name="route_title"
        />
      </Box>
    </Edit>
  );
};
