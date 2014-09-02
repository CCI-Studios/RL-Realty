<?php

function rlrealty_preprocess_html(&$vars) {
  $path = drupal_get_path_alias($_GET['q']);
  $aliases = str_replace('/', '-', $path);
  $vars['classes_array'][] = 'page-'.drupal_clean_css_identifier($aliases);
}

function rlrealty_preprocess_page(&$var)
{
	$googleMapsAPIKey = 'AIzaSyA2HwMIjerl4MGretViP6RZ6cr-Vrz0S1Y';
	drupal_add_js("https://maps.googleapis.com/maps/api/js?key=$googleMapsAPIKey", 'external');
}

?>
