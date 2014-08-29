<?php

function rlrealty_preprocess_html(&$vars) {
  $path = drupal_get_path_alias($_GET['q']);
  $aliases = str_replace('/', '-', $path);
  $vars['classes_array'][] = 'page-'.drupal_clean_css_identifier($aliases);
}

?>
