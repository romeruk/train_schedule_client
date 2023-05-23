import { Create } from "@refinedev/mui";
import { Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";

type Inputs = {
  station_title: string,
};

export const StationCreate = () => {
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
          {...register("station_title", {
            required: "This field is required",
						minLength: {
							value: 1,
							message: "Min length is 1"
						}
          })}
          error={!!(errors as any)?.station_title}
          helperText={(errors as any)?.station_title?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Station Title"
          name="station_title"
        />
      </Box>
    </Create>
  );
};
