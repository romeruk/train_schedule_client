import { Create } from "@refinedev/mui";
import { Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";

type Inputs = {
  route_title: string,
};

export const RouteCreate = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    formState: { errors },
  } = useForm<Inputs>();

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("route_title", {
            required: "This field is required",
						minLength: {
							value: 1,
							message: "Min length is 1"
						}
          })}
          error={!!(errors as any)?.route_title}
          helperText={(errors as any)?.route_title?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Route Title"
          name="route_title"
        />
      </Box>
    </Create>
  );
};
