# Import necessary libraries
from huggingface_hub import InferenceClient  # For loading and using text generation models
import os
import re

# Load the text generation model from Hugging Face Hub
text_generation_client = InferenceClient("mistralai/Mixtral-8x7B-Instruct-v0.1")

# Define a function to format prompts for the model
def format_prompt_for_model(user_prompt):
    """
    Formats a prompt for the text generation model, providing context and instructions.

    Args:
        user_prompt: The specific text prompt to be processed by the model.

    Returns:
        A formatted prompt string that includes system context and instructions.
    """

    system_context_prompt = (
        "You are a Lawyer with extreme knowledge in the Indian Penal Code (IPC) Sections and Code of Criminal Procedure (CRPC)."
        " Using the extracted text, give 4 applicable IPC Section [Starting from 100] and 2 CRPC Sections"
        " while stating the reason for your selection. Also give a float percentage between the range of 0 - 100 (%) of how truthful the extracted text is. "
        " Also give two cross-referencing based questions to further investigate the case."
        "End with 'I believe you should do further investigate the case to cross-check my suggestions.'"
    )
    combined_prompt = f"<s>[SYS] {system_context_prompt} [/SYS]\n[INST] {user_prompt} [/INST]"
    return combined_prompt


# Define a function to generate text using the model
def generate_legal_suggestions(
    prompt,
    creativity_level=0.2,  # Controls the randomness of the generated text
    max_tokens_to_generate=512,
    top_p_filtering_ratio=0.96,  # Controls the likelihood of selecting common words
    repetition_penalty=1.0,
):
    """
    Generates text using the loaded model, with options for controlling the output.

    Args:
        prompt: The formatted prompt string to be used for text generation.
        creativity_level: Controls the randomness of the generated text (higher = more creative).
        max_tokens_to_generate: The maximum number of tokens to generate.
        top_p_filtering_ratio: Controls the likelihood of selecting common words (higher = less surprising).
        repetition_penalty: Discourages the model from repeating itself.

    Returns:
        The generated text as a string.
    """

    # Ensure creativity_level and top_p_filtering_ratio are floats
    creativity_level = float(creativity_level)
    if creativity_level < 1e-2:
        creativity_level = 1e-2
    top_p_filtering_ratio = float(top_p_filtering_ratio)

    # Create a dictionary of generation parameters
    generation_parameters = dict(
        temperature=creativity_level,
        max_new_tokens=max_tokens_to_generate,
        top_p=top_p_filtering_ratio,
        repetition_penalty=repetition_penalty,
        do_sample=True,
        seed=42,
    )

    # Format the prompt using the prompter function
    model_ready_prompt = format_prompt_for_model(prompt)

    # Generate text using the model's text_generation method
    generated_text_stream = text_generation_client.text_generation(
        model_ready_prompt, **generation_parameters, stream=True, details=True, return_full_text=True
    )

    final_output_text = ""
    for text_segment in generated_text_stream:  # Build the output text incrementally
        final_output_text += text_segment.token.text

    extracted_ipc_sections = re.findall(r"Section \d+[A-Z]*", final_output_text)

    return final_output_text
