const config = useRuntimeConfig();
const response = await $fetch(`${config.public.apiBase}`);
